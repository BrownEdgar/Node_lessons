# Redis Caching Strategies

Кеширование данных с Redis для ускорения приложения.

## 🚀 Зачем нужен кеш?

- **Скорость** - данные из памяти в 100+ раз быстрее БД
- **Снижение нагрузки** - меньше запросов к БД
- **Масштабируемость** - обработка большего количества пользователей

## 📦 Установка

```bash
npm install redis ioredis
npm install rate-limit-redis express-rate-limit
```

## 🎯 Стратегии кеширования

### 1. Cache-Aside (Lazy Loading)

```javascript
// Проверить кеш → если нет → загрузить из БД → сохранить в кеш
const user = await redis.get(`user:${id}`);
if (!user) {
  user = await User.findById(id);
  await redis.setex(`user:${id}`, 3600, JSON.stringify(user));
}
```

### 2. Write-Through

```javascript
// Обновление кеша при записи в БД
await User.update(id, data);
await redis.setex(`user:${id}`, 3600, JSON.stringify(data));
```

### 3. Write-Behind

```javascript
// Запись сначала в кеш, потом асинхронно в БД
await redis.setex(`user:${id}`, 3600, JSON.stringify(data));
queue.add('updateUser', { id, data }); // Background job
```

## 🔑 Cache Key Design

```javascript
// Good key patterns
cache:user:123
cache:post:456:comments
cache:search:query-hash
cache:list:users:page:1:limit:10

// Bad keys
user_data
temp123
abc
```

## ⏰ TTL (Time To Live)

```javascript
// Разные TTL для разных типов данных
const TTL = {
  USER: 3600, // 1 час
  POST: 1800, // 30 минут
  LIST: 60, // 1 минута
  SEARCH: 600, // 10 минут
  STATIC: 86400, // 24 часа
  SESSION: 7200, // 2 часа
};
```

## 🧹 Cache Invalidation

```javascript
// Инвалидация при обновлении
router.put('/users/:id', async (req, res) => {
  await User.update(req.params.id, req.body);

  // Clear specific cache
  await redis.del(`cache:user:${req.params.id}`);

  // Clear pattern
  const keys = await redis.keys('cache:users:list:*');
  if (keys.length) await redis.del(...keys);
});
```

## 📊 Cache Patterns

### Response Caching Middleware

```javascript
router.get('/users', cache(60), async (req, res) => {
  const users = await User.find();
  res.json(users);
});
```

### Manual Caching

```javascript
const getCachedUser = async (id) => {
  const cached = await redis.get(`user:${id}`);
  if (cached) return JSON.parse(cached);

  const user = await User.findById(id);
  await redis.setex(`user:${id}`, 3600, JSON.stringify(user));
  return user;
};
```

## 🔍 Monitoring

```javascript
// Redis stats
const info = await redis.info('stats');

// Hit rate
const hits = await redis.get('cache:hits');
const misses = await redis.get('cache:misses');
const hitRate = hits / (hits + misses);
```

## ⚠️ Best Practices

1. **Всегда устанавливайте TTL** - избегайте вечного кеша
2. **Используйте namespaces** - `cache:model:id`
3. **Не кешируйте sensitive данные** - пароли, токены
4. **Мониторьте hit rate** - должен быть >80%
5. **Graceful degradation** - приложение работает без Redis
6. **Cache warm-up** - предзагрузка популярных данных

## 🚫 Когда НЕ использовать кеш

- Часто изменяющиеся данные
- Уникальные запросы (нет переиспользования)
- Критичные real-time данные
- Sensitive информация

## 📈 Performance Gains

- **БД запрос**: ~50-200ms
- **Redis запрос**: ~1-5ms
- **Ускорение**: 10-200x
