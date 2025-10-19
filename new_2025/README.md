# Node.js + Express + MongoDB - Modern Best Practices 2025

Современная коллекция туториалов с актуальными практиками разработки на Node.js

## 📁 Структура проекта

```
new_2025/
├── 01_project_structure/          # ✅ Правильная структура Enterprise приложения
├── 02_typescript_setup/           # ✅ TypeScript конфигурация и примеры
├── 03_eslint_prettier/            # ✅ Code quality tools
├── 04_environment_config/         # ✅ Безопасная работа с .env
├── 05_error_handling/             # ✅ Централизованная обработка ошибок
├── 06_logging/                    # ✅ Winston & Pino
├── 07_validation/                 # ✅ Joi, Zod, express-validator
├── 08_authentication_modern/      # ✅ JWT + Refresh Tokens + OAuth2
├── 09_testing/                    # ✅ Jest + Supertest + Coverage
├── 10_docker/                     # ✅ Docker & Docker Compose
├── 11_database_transactions/      # ✅ MongoDB & PostgreSQL транзакции
├── 12_database_migrations/        # ✅ Sequelize & TypeORM migrations
├── 13_caching_redis/              # ✅ Redis caching strategies
├── 14_rate_limiting/              # ✅ DDoS protection & rate limiting
├── 15_graphql/                    # ✅ GraphQL с Apollo Server
├── 16_websockets/                 # ✅ Native WebSockets & Socket.IO
├── 17_message_queues/             # ✅ Bull & RabbitMQ
├── 18_file_uploads_cloud/         # ✅ AWS S3, Cloudinary, Multer
├── 19_email_service/              # ✅ Nodemailer + templates
├── 20_api_documentation/          # ✅ Swagger/OpenAPI
├── 21_scheduling/                 # ✅ node-cron & Bull queues
├── 22_monitoring/                 # ✅ PM2, health checks
├── 23_security_best_practices/    # ✅ Helmet, CORS, XSS, CSRF
├── 24_ci_cd/                      # ✅ GitHub Actions, GitLab CI
├── 25_microservices/              # ✅ Microservices архитектура
└── 26_production_ready_app/       # ✅ Полноценное production приложение
```

## 🚀 Ключевые улучшения по сравнению со старыми туториалами

### Исправленные анти-паттерны:

- ❌ Хардкод credentials → ✅ .env + validation
- ❌ `body-parser` → ✅ Встроенный Express.json()
- ❌ Устаревший Joi → ✅ Современный Joi/Zod
- ❌ Callback-based DB → ✅ Async/await
- ❌ var/старый синтаксис → ✅ const/let + ES6+
- ❌ Плохие catch блоки → ✅ Централизованная обработка ошибок
- ❌ CORS "\*" → ✅ Whitelist origins
- ❌ Нет логирования → ✅ Winston/Pino
- ❌ Нет тестов → ✅ Jest + 80%+ coverage

### Новые темы:

- TypeScript
- Testing (Unit, Integration, E2E)
- Docker & Containerization
- CI/CD pipelines
- GraphQL
- Redis caching
- Message queues
- Cloud integrations
- API documentation
- Monitoring & observability
- Database transactions & migrations
- Security hardening

## 📚 Как использовать

Каждая папка содержит:

- `README.md` - теория и объяснения
- `package.json` - список зависимостей
- Примеры кода с комментариями
- Best practices и anti-patterns
- Ссылки на документацию

## 🔧 Установка зависимостей для конкретного примера

```bash
cd 01_project_structure
npm install
```

## 📖 Рекомендуемый порядок изучения

1. **Базовая структура** (01-04)
2. **Error handling & Logging** (05-06)
3. **Validation & Auth** (07-08)
4. **Testing** (09)
5. **DevOps** (10, 24)
6. **Database** (11-12)
7. **Performance** (13-14)
8. **Advanced** (15-23)
9. **Архитектура** (25-26)

---

**Автор:** Edgar Brown  
**Обновлено:** 2025  
**Версия Node.js:** 18+ LTS
