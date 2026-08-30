# 🚀 Apache Kafka — Учебный мини-проект

> Node.js + KafkaJS + MongoDB + EJS | Полное объяснение с нуля

---

## 📖 Что такое Kafka?

**Apache Kafka** — это распределённая система обмена сообщениями (message broker).

Представь Kafka как **почтовое отделение**:
- Кто-то отправляет письма (Producer) → они попадают в ящики по категориям (Topic) → кто-то их забирает и читает (Consumer)

### Где используется Kafka?
- **Микросервисы** — передача событий между сервисами
- **Аналитика в реальном времени** — потоки кликов, просмотров
- **Логирование** — централизованный сбор логов
- **IoT** — обработка данных с тысяч устройств
- **Финтех** — обработка транзакций и платежей

**Примеры компаний:** LinkedIn (создала Kafka), Uber, Netflix, Airbnb, Spotify

---

## 📚 Основные термины

### 📦 Topic (Топик)
Именованный поток данных в Kafka. Как **папка** или **очередь** для определённой категории сообщений.

```
Topic "orders"        Topic "notifications"    Topic "logs"
  [msg1, msg2, ...]     [msg1, msg2, ...]        [msg1, msg2, ...]
```

- Producer отправляет сообщения **в** topic
- Consumer читает сообщения **из** topic
- Один topic может иметь много producer'ов и consumer'ов

---

### 📊 Partition (Раздел)
Каждый topic делится на несколько **partition** — это физические "ящики" хранения.

```
Topic "messages" (3 partition):
  Partition 0: [msg_a, msg_b, msg_e, ...]
  Partition 1: [msg_c, msg_f, ...]
  Partition 2: [msg_d, msg_g, ...]
```

**Зачем нужны partition:**
1. **Масштабируемость** — разные partition можно хранить на разных серверах
2. **Параллельность** — несколько consumer'ов читают разные partition одновременно
3. **Порядок** — внутри одного partition порядок сообщений ГАРАНТИРОВАН

---

### 🖥️ Broker (Брокер)
Сервер Kafka. Брокер получает сообщения от producer'ов, хранит их и отдаёт consumer'ам.

```
Кластер Kafka (3 брокера):
  Broker 1 (leader)   Broker 2 (replica)   Broker 3 (replica)
  Partition 0 ──────── Partition 0 copy ──── Partition 0 copy
  Partition 1 ──────── Partition 1 copy ──── Partition 1 copy
```

В production обычно несколько брокеров — для отказоустойчивости.

---

### 📤 Producer (Производитель)
Компонент, который **отправляет** сообщения в Kafka topic.

```javascript
// Простой пример
await producer.send({
  topic: 'orders',
  messages: [{ key: 'user-1', value: 'Order #123' }]
});
```

---

### 📥 Consumer (Потребитель)
Компонент, который **читает** сообщения из Kafka topic.

Consumer работает в фоне и реагирует на каждое новое сообщение.

```javascript
await consumer.run({
  eachMessage: async ({ partition, message }) => {
    console.log(message.value.toString());
  }
});
```

---

### 🔢 Offset (Смещение)
Порядковый номер сообщения внутри partition. Начинается с 0.

```
Partition 0:
  offset 0: "Заказ #1"
  offset 1: "Заказ #2"
  offset 2: "Заказ #3"   ← consumer дочитал до сюда
  offset 3: "Заказ #4"   ← следующее сообщение
```

Consumer запоминает последний прочитанный offset. При перезапуске — продолжает с него.

---

## 🔄 Как работает поток сообщений

```
Producer                Kafka Broker              Consumer
   │                         │                        │
   │  send(topic, key, msg)  │                        │
   │ ──────────────────────> │                        │
   │                         │                        │
   │                    topic: messages               │
   │                    partition 0: [msg, ...]       │
   │                    partition 1: [msg, ...]       │
   │                    partition 2: [msg, ...]       │
   │                         │                        │
   │                         │   poll() / eachMessage │
   │                         │ <───────────────────── │
   │                         │                        │
   │                         │   сообщения            │
   │                         │ ──────────────────────>│
   │                         │                        │
   │                         │   commitOffset()       │
   │                         │ <───────────────────── │
```

**Шаги:**
1. Producer подключается к брокеру
2. Producer отправляет сообщение с key и value
3. Broker определяет partition: `hash(key) % num_partitions`
4. Сообщение сохраняется в partition с новым offset
5. Consumer в фоне опрашивает брокер на наличие новых сообщений
6. Consumer читает сообщение и обрабатывает его
7. Consumer фиксирует offset (говорит Kafka: "это я уже прочитал")

---

## 📊 Что такое Partition и зачем они нужны

### Зачем делить topic на partition?

**Без partition (1 partition):**
```
Один поток → Один consumer читает → Лимит ~100k msg/sec
```

**С partition (3 partition):**
```
Поток А → Consumer 1 (partition 0) → 100k msg/sec
Поток Б → Consumer 2 (partition 1) → 100k msg/sec  ← параллельно!
Поток В → Consumer 3 (partition 2) → 100k msg/sec
                                      Итого: ~300k msg/sec
```

### Как key влияет на выбор partition?

```javascript
// Kafka вычисляет: hash(key) % кол-во_partition = partition

hash('user-1') % 3 = 0  → Partition 0
hash('user-2') % 3 = 1  → Partition 1
hash('user-3') % 3 = 2  → Partition 2
hash('user-1') % 3 = 0  → Partition 0 (тот же!)
```

**Правило:** сообщения с **одинаковым key** → **всегда один partition** → **порядок гарантирован**

**Пример из реальной жизни:**
- Все действия пользователя user-123 → Partition 0 (порядок: login, view, purchase, logout)
- Если бы они шли в разные partition — порядок мог бы перепутаться

---

## ⚙️ Delivery Semantics — Семантика доставки

Ответ на вопрос: **сколько раз сообщение будет обработано?**

### 🎲 At-Most-Once (Максимум один раз)

Offset фиксируется **ДО** обработки сообщения.

```javascript
consumer.run({
  autoCommit: true,  // Автоматически фиксирует offset до обработки
  eachMessage: async ({ message }) => {
    await processMessage(message); // Если здесь упадём — сообщение потеряно
  }
});
```

**Сценарий потери:**
1. Consumer получил сообщение
2. Kafka зафиксировала offset ✅
3. Consumer упал при обработке ❌
4. Сообщение потеряно навсегда 😢

**Когда использовать:** метрики, счётчики просмотров (потеря допустима)

---

### ✅ At-Least-Once (Минимум один раз) ← используем в проекте

Offset фиксируется **ПОСЛЕ** обработки сообщения.

```javascript
consumer.run({
  autoCommit: false,  // Управляем вручную
  eachMessage: async ({ topic, partition, message }) => {
    await processMessage(message);    // Сначала обрабатываем
    await consumer.commitOffsets([{   // Потом фиксируем offset
      topic, partition,
      offset: String(BigInt(message.offset) + 1n)
    }]);
  }
});
```

**Сценарий дубликата:**
1. Consumer обработал сообщение ✅
2. Kafka ещё не зафиксировала offset
3. Consumer упал ❌
4. При перезапуске — сообщение прочитается снова ⚠️

**Решение:** сделать обработку **идемпотентной** (повторный запрос = тот же результат)

**Когда использовать:** email-уведомления, создание заказов (дубликат лучше потери)

---

### 💎 Exactly-Once (Ровно один раз)

Самая сложная настройка. Требует транзакций.

```javascript
// Producer с транзакциями
const producer = kafka.producer({
  transactionalId: 'my-transactional-producer',
  idempotent: true,  // Дедупликация на стороне брокера
});

await producer.transaction(async (tx) => {
  await tx.send({ topic: 'output', messages: [processed] });
  await tx.sendOffsets({
    consumerGroupId: 'my-group',
    topics: [{ topic, partitions: [{ partition, offset }] }]
  });
});

// Consumer читает только committed транзакции
const consumer = kafka.consumer({
  groupId: 'my-group',
  // Kafka автоматически пропускает uncommitted транзакции
});
```

**Когда использовать:** финансовые переводы, биллинг, критически важные данные

| Семантика | Потеря | Дубликат | Скорость |
|-----------|--------|----------|----------|
| At-Most-Once | ✅ возможна | ❌ нет | ⚡ высокая |
| At-Least-Once | ❌ нет | ✅ возможен | 🔥 средняя |
| Exactly-Once | ❌ нет | ❌ нет | 🐢 низкая |

---

## 🚀 Как запустить проект

### 1. Требования
- Docker + Docker Compose
- Node.js 18+

### 2. Запуск инфраструктуры (Kafka + MongoDB)

```bash
# Запустить Kafka, Zookeeper и MongoDB в фоне
docker-compose up -d

# Проверить, что всё запущено
docker-compose ps

# Смотреть логи Kafka
docker logs kafka-demo-broker -f
```

### 3. Создать topic с 3 partition (опционально)

Topic создаётся автоматически, но можно создать вручную:

```bash
# Зайти в контейнер Kafka
docker exec -it kafka-demo-broker bash

# Создать topic 'messages' с 3 partition
kafka-topics --create \
  --bootstrap-server localhost:29092 \
  --topic messages \
  --partitions 3 \
  --replication-factor 1

# Посмотреть список топиков
kafka-topics --list --bootstrap-server localhost:29092

# Подробная информация о топике
kafka-topics --describe --topic messages --bootstrap-server localhost:29092
```

### 4. Установка зависимостей и запуск

```bash
npm install
npm start
```

Приложение будет доступно: **http://localhost:3000**

### 5. Тестирование через curl

```bash
# Отправить сообщение с key 'user-1'
curl -X POST http://localhost:3000/api/send \
  -H "Content-Type: application/json" \
  -d '{"message": "Заказ оформлен!", "key": "user-1"}'

# Отправить несколько с разными key
curl -X POST http://localhost:3000/api/send \
  -H "Content-Type: application/json" \
  -d '{"message": "Привет из user-2", "key": "user-2"}'

curl -X POST http://localhost:3000/api/send \
  -H "Content-Type: application/json" \
  -d '{"message": "Снова user-1", "key": "user-1"}'

# Получить все сообщения
curl http://localhost:3000/api/messages

# Статистика по partition
curl http://localhost:3000/api/partitions
```

---

## 📁 Структура проекта

```
server_kafka/
├── app.js                  # Главный файл Express + инициализация
├── .env                    # Настройки (KAFKA_BROKER, MONGO_URI и т.д.)
├── docker-compose.yml      # Kafka + Zookeeper + MongoDB
├── package.json
│
├── config/
│   ├── kafka.js            # Конфигурация KafkaJS (создание kafka instance)
│   └── db.js               # Подключение к MongoDB
│
├── kafka/
│   ├── producer.js         # Kafka Producer — отправка сообщений
│   └── consumer.js         # Kafka Consumer — чтение + сохранение в MongoDB
│
├── models/
│   └── Message.js          # Mongoose модель сообщения
│
├── routes/
│   └── index.js            # Express маршруты (GET /, POST /send, API)
│
├── views/
│   ├── index.ejs           # Главная страница с UI
│   └── error.ejs           # Страница ошибки
│
└── public/
    └── stylesheets/
        └── style.css       # Стили
```

---

## 🔌 API Эндпоинты

| Метод | URL | Описание |
|-------|-----|----------|
| `GET` | `/` | Главная страница с UI |
| `POST` | `/send` | Отправить сообщение из формы |
| `POST` | `/api/send` | REST API — отправить сообщение (JSON) |
| `GET` | `/api/messages` | Получить все сообщения из MongoDB |
| `GET` | `/api/partitions` | Статистика распределения по partition |

---

## 🧪 Демонстрация partition

Открой UI и отправь несколько сообщений с **одинаковым key**:

```
key: "user-1", message: "Первое сообщение"
key: "user-1", message: "Второе сообщение"
key: "user-1", message: "Третье сообщение"
```

→ Все три попадут в **один и тот же partition**

Теперь с разными key:

```
key: "user-1" → Partition 0
key: "user-2" → Partition 1
key: "user-3" → Partition 2
```

→ Каждый key в своём partition. Статистика видна на главной странице.

---

## 🛑 Остановка

```bash
# Остановить Docker контейнеры
docker-compose down

# Остановить и удалить данные MongoDB
docker-compose down -v
```

---

*Создано в учебных целях для понимания Apache Kafka*
