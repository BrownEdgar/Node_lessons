# Docker & Docker Compose

Контейнеризация Node.js приложения с всеми зависимостями.

## 🐳 Что включено

- **Multi-stage Dockerfile** - оптимизированный образ
- **Docker Compose** - оркестрация всех сервисов
- MongoDB, Redis, PostgreSQL, Nginx
- Health checks
- Volumes для персистентности данных
- Non-root user для безопасности

## 🚀 Использование

### Запуск всех сервисов

```bash
docker-compose up -d
```

### Остановка

```bash
docker-compose down
```

### Пересборка

```bash
docker-compose up --build
```

### Просмотр логов

```bash
docker-compose logs -f app
```

### Выполнение команд в контейнере

```bash
docker-compose exec app npm test
docker-compose exec app npm run migrate
```

## 📦 Оптимизации

### Multi-stage Build

- Разделение builder и production stage
- Минимальный размер финального образа

### Alpine Linux

- Базовый образ ~5MB вместо ~900MB
- node:18-alpine вместо node:18

### Layer Caching

- package.json копируется отдельно
- Dependencies кешируются между билдами

### Security

- Non-root user
- .dockerignore для secrets
- Health checks

## 🔧 Development vs Production

### Development

```bash
docker-compose -f docker-compose.dev.yml up
```

Включает:

- Hot reload с nodemon
- Volume mount для исходников
- Открытые debugging порты

### Production

```bash
docker-compose up -d
```

Включает:

- Optimized build
- Health checks
- Restart policies
- Resource limits

## 🌐 Nginx Reverse Proxy

Nginx настроен как reverse proxy:

- SSL termination
- Load balancing
- Static file serving
- Gzip compression

## 📊 Мониторинг

```bash
# Статистика контейнеров
docker stats

# Health check status
docker ps

# Inspect контейнера
docker inspect nodejs_app
```

## 💾 Volumes

Данные сохраняются в volumes:

- `mongo-data` - MongoDB данные
- `redis-data` - Redis persistence
- `postgres-data` - PostgreSQL данные

## 🔗 Полезные команды

```bash
# Удалить всё (включая volumes)
docker-compose down -v

# Пересоздать только app
docker-compose up -d --build app

# Shell в контейнере
docker-compose exec app sh

# Просмотр конфигурации
docker-compose config
```
