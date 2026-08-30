// =====================================================
// МАРШРУТЫ (ROUTES)
// =====================================================
// Здесь описаны все HTTP-эндпоинты нашего приложения:
//   GET  /        — главная страница с UI
//   POST /send    — отправить сообщение в Kafka (через форму)
//   POST /api/send — отправить сообщение через API (JSON)
//   GET  /api/messages — получить все сообщения из MongoDB
// =====================================================

var express = require('express');
var router = express.Router();
const { sendMessage } = require('../kafka/producer');
const Message = require('../models/Message');

// =====================================================
// GET / — Главная страница
// =====================================================
// Загружаем все сохранённые сообщения из MongoDB
// и передаём в EJS-шаблон для отображения
// =====================================================
router.get('/', async (req, res, next) => {
  try {
    // Получаем все сообщения, отсортированные по времени (новые сначала)
    const messages = await Message.find().sort({ timestamp: -1 }).limit(50);

    res.render('index', {
      title: 'Kafka Demo',
      messages: messages,
      // Определяем уникальные partition для отображения статистики
      partitions: [...new Set(messages.map(m => m.partition))].sort(),
    });
  } catch (err) {
    next(err);
  }
});

// =====================================================
// POST /send — Отправка сообщения из UI-формы
// =====================================================
// Принимает данные из HTML-формы:
//   message — текст сообщения
//   key     — ключ для маршрутизации по partition
//
// КАК РАБОТАЕТ МАРШРУТИЗАЦИЯ ПО KEY:
//   Kafka вычисляет: hash(key) % кол-во_partition = partition
//   key='user-1' → всегда в один и тот же partition
//   key='user-2' → всегда в другой partition
//   → Порядок для одного ключа ГАРАНТИРОВАН
// =====================================================
router.post('/send', async (req, res, next) => {
  try {
    const { message, key } = req.body;

    if (!message || message.trim() === '') {
      return res.redirect('/?error=empty');
    }

    const topic = process.env.KAFKA_TOPIC || 'messages';
    // Если key не указан — используем 'default'
    const messageKey = key && key.trim() ? key.trim() : 'default';

    // Отправляем сообщение в Kafka
    const result = await sendMessage(topic, messageKey, message.trim());

    console.log(`🎯 Сообщение попало в partition: ${result.partition}`);

    // Перенаправляем обратно на главную страницу
    // Небольшая задержка, чтобы consumer успел обработать и сохранить
    setTimeout(() => res.redirect('/'), 500);

  } catch (err) {
    console.error('❌ Ошибка отправки:', err.message);
    next(err);
  }
});

// =====================================================
// POST /api/send — REST API для отправки сообщений
// =====================================================
// Тот же функционал, но для программного использования.
// Пример запроса:
//   curl -X POST http://localhost:3000/api/send \
//     -H "Content-Type: application/json" \
//     -d '{"message": "Hello Kafka!", "key": "user-1"}'
// =====================================================
router.post('/api/send', async (req, res) => {
  try {
    const { message, key } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Поле "message" обязательно' });
    }

    const topic = process.env.KAFKA_TOPIC || 'messages';
    const messageKey = key || 'default';

    const result = await sendMessage(topic, messageKey, message);

    // Возвращаем JSON с информацией о том, куда попало сообщение
    res.json({
      success: true,
      message: 'Сообщение отправлено в Kafka',
      details: {
        topic: topic,
        key: messageKey,
        value: message,
        // Куда попало сообщение — в какой partition
        partition: result.partition,
        offset: result.baseOffset,
      },
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =====================================================
// GET /api/messages — Получить все сообщения из MongoDB
// =====================================================
// Возвращает JSON-список всех сохранённых сообщений.
// Пример:
//   curl http://localhost:3000/api/messages
// =====================================================
router.get('/api/messages', async (req, res) => {
  try {
    const messages = await Message.find()
      .sort({ timestamp: -1 })
      .limit(100)
      .lean(); // .lean() возвращает обычные JS-объекты (быстрее)

    res.json({
      total: messages.length,
      messages: messages,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =====================================================
// GET /api/partitions — Статистика по partition
// =====================================================
// Показывает, как сообщения распределились по partition
// =====================================================
router.get('/api/partitions', async (req, res) => {
  try {
    // Агрегируем: считаем количество сообщений в каждом partition
    const stats = await Message.aggregate([
      {
        $group: {
          _id: { partition: '$partition', key: '$key' },
          count: { $sum: 1 },
          lastOffset: { $max: '$offset' },
        },
      },
      { $sort: { '_id.partition': 1 } },
    ]);

    res.json({ partitionStats: stats });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
