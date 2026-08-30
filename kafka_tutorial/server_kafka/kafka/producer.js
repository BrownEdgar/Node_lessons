// =====================================================
// KAFKA PRODUCER — Отправитель сообщений
// =====================================================
// Producer — это компонент, который ОТПРАВЛЯЕТ сообщения в Kafka.
// Представь Kafka как почтовое отделение:
//   - Producer — тот, кто бросает письмо в ящик
//   - Topic — название ящика (канала)
//   - Consumer — тот, кто забирает письма
// =====================================================

const kafka = require('../config/kafka');

// Создаём экземпляр producer'а
// Один producer может отправлять в несколько topic
const producer = kafka.producer();

// Флаг, чтобы не подключаться повторно
let isConnected = false;

// =====================================================
// ПОДКЛЮЧЕНИЕ PRODUCER'А
// =====================================================
const connectProducer = async () => {
  if (isConnected) return;

  await producer.connect();
  isConnected = true;
  console.log('✅ Kafka Producer подключён');
};

// =====================================================
// ОТПРАВКА СООБЩЕНИЯ
// =====================================================
// topic — название канала (например, 'messages')
// key   — ключ для маршрутизации по partition (например, 'user-1')
// value — текст сообщения
// =====================================================
const sendMessage = async (topic, key, value) => {
  await connectProducer();

  // -----------------------------------------------
  // ЧТО ТАКОЕ TOPIC?
  // -----------------------------------------------
  // Topic — это именованный поток данных в Kafka.
  // Как папка с письмами одной категории.
  // Например: 'orders', 'notifications', 'logs'
  // Producer отправляет сообщения в topic,
  // consumer читает из topic.
  // -----------------------------------------------

  // -----------------------------------------------
  // ЧТО ТАКОЕ KEY?
  // -----------------------------------------------
  // Key — это ключ маршрутизации.
  // Kafka использует key для выбора partition:
  //   hash(key) % количество_partition = номер_partition
  //
  // ВАЖНО:
  //   - Сообщения с одинаковым key → в один partition → порядок гарантирован
  //   - Без key → round-robin по partition → порядок НЕ гарантирован
  //
  // Пример:
  //   key='user-1' → всегда partition 0
  //   key='user-2' → всегда partition 1
  //   key='user-3' → всегда partition 2
  // -----------------------------------------------

  const result = await producer.send({
    topic: topic,

    messages: [
      {
        // key должен быть строкой или Buffer
        key: String(key),

        // value — само сообщение, тоже строка или Buffer
        // В реальных проектах часто используют JSON.stringify()
        value: String(value),
      },
    ],
  });

  // result содержит информацию о том, куда попало сообщение:
  // [{ topicName, partition, errorCode, offset }]
  console.log(`📤 Сообщение отправлено:`);
  console.log(`   topic: ${topic}`);
  console.log(`   key: ${key}`);
  console.log(`   value: ${value}`);
  console.log(`   → partition: ${result[0].partition}, offset: ${result[0].baseOffset}`);

  return result[0]; // Возвращаем мета-данные об отправке
};

// =====================================================
// ОТКЛЮЧЕНИЕ PRODUCER'А (при завершении приложения)
// =====================================================
const disconnectProducer = async () => {
  if (isConnected) {
    await producer.disconnect();
    isConnected = false;
    console.log('🔌 Kafka Producer отключён');
  }
};

module.exports = { sendMessage, connectProducer, disconnectProducer };
