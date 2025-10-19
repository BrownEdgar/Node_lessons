# Message Queues - Bull & RabbitMQ

Асинхронная обработка задач в фоне.

## 🎯 Зачем нужны очереди?

### Проблемы без очередей

```javascript
// ❌ Плохо: блокирует response
app.post('/users', async (req, res) => {
  const user = await User.create(req.body);

  // Долгие операции блокируют ответ
  await sendWelcomeEmail(user.email); // 2-5 сек
  await generateThumbnails(user.avatar); // 3-10 сек
  await updateAnalytics(user); // 1-3 сек

  res.json(user); // Пользователь ждёт 6-18 секунд!
});
```

### С очередями

```javascript
// ✅ Хорошо: мгновенный response
app.post('/users', async (req, res) => {
  const user = await User.create(req.body);

  // Добавляем задачи в очередь
  await emailQueue.add({ userId: user.id });
  await imageQueue.add({ userId: user.id });
  await analyticsQueue.add({ userId: user.id });

  res.json(user); // Ответ мгновенно!
});
```

## 📦 Bull vs RabbitMQ

| Feature     | Bull       | RabbitMQ      |
| ----------- | ---------- | ------------- |
| Backend     | Redis      | AMQP          |
| Сложность   | Простой    | Сложнее       |
| UI          | Bull Board | Management UI |
| Priority    | ✅         | ✅            |
| Delay       | ✅         | ✅            |
| Retry       | ✅         | ✅            |
| Performance | Высокий    | Очень высокий |

## 🐂 Bull Queue

### Установка

```bash
npm install bull
npm install @bull-board/api @bull-board/express
```

### Создание очереди

```javascript
const Queue = require('bull');

const emailQueue = new Queue('email', {
  redis: {
    host: 'localhost',
    port: 6379,
  },
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 2000,
    },
    removeOnComplete: 100,
    removeOnFail: 1000,
  },
});
```

### Producer (добавление задач)

```javascript
// Простая задача
await emailQueue.add({
  to: 'user@example.com',
  subject: 'Welcome!',
  body: 'Hello!',
});

// С приоритетом
await emailQueue.add(
  { to: 'vip@example.com' },
  { priority: 1 } // Чем меньше, тем выше приоритет
);

// Отложенная задача
await emailQueue.add(
  { to: 'user@example.com' },
  { delay: 60000 } // Выполнить через 1 минуту
);

// Повторяющаяся задача (cron)
await emailQueue.add(
  { type: 'digest' },
  { repeat: { cron: '0 9 * * *' } } // Каждый день в 9:00
);
```

### Consumer (обработка задач)

```javascript
emailQueue.process(async (job) => {
  const { to, subject, body } = job.data;

  console.log(`Processing job ${job.id}`);

  // Обновление прогресса
  await job.progress(50);

  // Выполнение задачи
  await sendEmail(to, subject, body);

  await job.progress(100);

  // Возвращаем результат
  return { sent: true, timestamp: new Date() };
});
```

### События

```javascript
emailQueue.on('completed', (job, result) => {
  console.log(`Job ${job.id} completed with result:`, result);
});

emailQueue.on('failed', (job, err) => {
  console.error(`Job ${job.id} failed:`, err);
});

emailQueue.on('progress', (job, progress) => {
  console.log(`Job ${job.id} is ${progress}% done`);
});
```

## 🎨 Bull Board (UI Dashboard)

```javascript
const { createBullBoard } = require('@bull-board/api');
const { BullAdapter } = require('@bull-board/api/bullAdapter');
const { ExpressAdapter } = require('@bull-board/express');

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/admin/queues');

createBullBoard({
  queues: [
    new BullAdapter(emailQueue),
    new BullAdapter(imageQueue),
    new BullAdapter(notificationQueue),
  ],
  serverAdapter,
});

app.use('/admin/queues', serverAdapter.getRouter());
// Открыть: http://localhost:3000/admin/queues
```

## 🐰 RabbitMQ

### Установка

```bash
npm install amqplib
```

### Producer

```javascript
const amqp = require('amqplib');

async function sendToQueue(queueName, message) {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();

  await channel.assertQueue(queueName, {
    durable: true, // Сохранять очередь при перезагрузке
  });

  channel.sendToQueue(
    queueName,
    Buffer.from(JSON.stringify(message)),
    { persistent: true } // Сохранять сообщения на диск
  );

  await channel.close();
  await connection.close();
}
```

### Consumer

```javascript
async function consumeQueue(queueName) {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();

  await channel.assertQueue(queueName, { durable: true });
  channel.prefetch(1); // Обрабатывать по одному сообщению

  channel.consume(queueName, async (msg) => {
    const data = JSON.parse(msg.content.toString());

    try {
      await processMessage(data);
      channel.ack(msg); // Подтвердить обработку
    } catch (error) {
      channel.nack(msg, false, true); // Вернуть в очередь
    }
  });
}
```

## 🎯 Use Cases

### 1. Email отправка

```javascript
await emailQueue.add('welcome', {
  to: user.email,
  template: 'welcome',
  data: { name: user.name },
});
```

### 2. Обработка изображений

```javascript
await imageQueue.add('thumbnail', {
  imageUrl: uploadedFile.url,
  sizes: [100, 300, 800],
});
```

### 3. Генерация отчётов

```javascript
await reportQueue.add(
  'monthly',
  {
    userId: req.user.id,
    month: new Date().getMonth(),
  },
  {
    priority: 3,
    delay: 5000, // Начать через 5 сек
  }
);
```

### 4. Парсинг данных

```javascript
await scrapeQueue.add(
  'product',
  {
    url: 'https://example.com/product/123',
    depth: 2,
  },
  {
    attempts: 5,
    backoff: 'exponential',
  }
);
```

### 5. Push уведомления

```javascript
await notificationQueue.add(
  'push',
  {
    userId: user.id,
    title: 'New message',
    body: 'You have a new message',
  },
  {
    priority: 1, // Высокий приоритет
  }
);
```

## ⚡ Advanced Patterns

### 1. Rate Limiting

```javascript
const queue = new Queue('api', {
  limiter: {
    max: 10, // 10 задач
    duration: 1000, // за 1 секунду
  },
});
```

### 2. Job Chaining

```javascript
// После выполнения job1 запустить job2
queue.process('job1', async (job) => {
  const result = await doSomething();
  await queue.add('job2', { input: result });
});
```

### 3. Priority Queue

```javascript
await queue.add({ urgent: true }, { priority: 1 });
await queue.add({ normal: true }, { priority: 5 });
await queue.add({ low: true }, { priority: 10 });
```

## 🔍 Monitoring

```javascript
// Статистика очереди
const counts = await queue.getJobCounts();
console.log(counts); // { waiting: 5, active: 2, completed: 100 }

// Получить задачи
const waitingJobs = await queue.getWaiting();
const activeJobs = await queue.getActive();
const failedJobs = await queue.getFailed();
```

## 🛡️ Error Handling

```javascript
emailQueue.on('failed', async (job, err) => {
  // Логирование
  logger.error(`Job ${job.id} failed:`, err);

  // Уведомление админов
  if (job.attemptsMade >= job.opts.attempts) {
    await notifyAdmin({
      type: 'job_failed',
      jobId: job.id,
      error: err.message,
    });
  }
});
```

## 📊 Best Practices

1. **Idempotency** - задача может выполниться несколько раз
2. **Small payloads** - только необходимые данные
3. **Exponential backoff** - для retry
4. **Dead letter queue** - для failed jobs
5. **Monitoring** - всегда мониторить очереди
6. **Cleanup** - удалять старые completed jobs
7. **Separate queues** - разные очереди для разных задач
