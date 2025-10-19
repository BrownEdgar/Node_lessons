# Enterprise Project Structure - Best Practices

Правильная структура проекта для масштабируемых Node.js приложений.

## 📁 Структура

```
src/
├── config/              # Конфигурация приложения
│   ├── database.js      # DB конфигурация
│   ├── server.js        # Server settings
│   └── index.js         # Export all configs
├── controllers/         # Route controllers (бизнес логика)
├── models/              # Database models
├── routes/              # API routes
├── services/            # Бизнес-логика (separates от controllers)
├── middlewares/         # Custom middleware
│   ├── auth.js
│   ├── errorHandler.js
│   ├── validation.js
│   └── logger.js
├── utils/               # Utility functions
│   ├── logger.js
│   ├── apiError.js
│   └── catchAsync.js
├── validators/          # Request validation schemas
├── constants/           # Constants & enums
├── types/               # TypeScript types (если используется TS)
├── tests/               # Test files
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── docs/                # Documentation
├── app.js               # Express app setup
└── server.js            # Server entry point

root/
├── .env.example         # Example environment variables
├── .gitignore
├── .eslintrc.js
├── .prettierrc
├── jest.config.js
├── docker-compose.yml
├── Dockerfile
├── package.json
└── README.md
```

## 🎯 Принципы организации

### 1. Separation of Concerns

- **Controllers** - обработка HTTP запросов/ответов
- **Services** - бизнес-логика
- **Models** - работа с данными
- **Middlewares** - промежуточная обработка

### 2. DRY (Don't Repeat Yourself)

- Вынос повторяющегося кода в `utils/`
- Переиспользуемые middleware

### 3. SOLID принципы

- Single Responsibility
- Dependency Injection
- Interface segregation

## 📦 Почему эта структура?

### ❌ Плохо (как в старых туториалах)

```javascript
// Всё в одном файле app.js - 500+ строк
app.post('/users', async (req, res) => {
  // Валидация здесь
  // Бизнес логика здесь
  // DB операции здесь
  // Всё перемешано
});
```

### ✅ Хорошо

```javascript
// routes/user.routes.js
router.post('/', validate(userSchema), userController.create);

// controllers/user.controller.js
exports.create = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(201).json({ success: true, data: user });
});

// services/user.service.js
exports.createUser = async (userData) => {
  // Бизнес логика
  return await User.create(userData);
};
```

## 🔐 Безопасность

- Чувствительные данные только в `.env`
- `.env` в `.gitignore`
- Всегда есть `.env.example`

## 📝 Naming Conventions

- **Files**: kebab-case (`user-controller.js`)
- **Classes**: PascalCase (`UserService`)
- **Functions**: camelCase (`createUser`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_RETRIES`)
- **Private vars**: `_prefixed` или `#private`

## 🚀 Использование

См. файлы в этой папке для полного примера.
