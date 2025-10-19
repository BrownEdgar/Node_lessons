# Testing with Jest + Supertest

Полноценное тестирование Node.js приложений.

## 🧪 Типы тестов

1. **Unit Tests** - тестирование отдельных функций
2. **Integration Tests** - тестирование API endpoints
3. **E2E Tests** - полный путь пользователя

## 📦 Установка

```bash
npm install --save-dev jest supertest @types/jest @types/supertest
npm install --save-dev mongodb-memory-server # In-memory MongoDB
```

## 🚀 Запуск

```bash
npm test                  # Все тесты
npm run test:watch        # Watch mode
npm run test:coverage     # С coverage
npm run test:unit         # Только unit
npm run test:integration  # Только integration
```

## 📝 Примеры

### Unit Test

```javascript
// services/user.service.test.js
describe('UserService', () => {
  describe('createUser', () => {
    it('should create user with hashed password', async () => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      };

      const user = await userService.createUser(userData);

      expect(user).toBeDefined();
      expect(user.email).toBe(userData.email);
      expect(user.password).not.toBe(userData.password);
    });
  });
});
```

### Integration Test

```javascript
// routes/user.routes.test.js
describe('POST /api/users', () => {
  it('should create new user', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      })
      .expect(201);

    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty('_id');
  });
});
```

## 🎯 Best Practices

- **Arrange-Act-Assert** pattern
- Один assert на тест (когда возможно)
- Независимые тесты
- Используйте factories/fixtures
- Mock external services
- Test edge cases
- Достигайте >80% coverage

## 📊 Coverage

Jest автоматически генерирует отчёт:

- `coverage/lcov-report/index.html` - HTML отчёт
- Минимум 80% coverage для production

## 🔍 Debugging

```bash
node --inspect-brk node_modules/.bin/jest --runInBand
```

Затем откройте `chrome://inspect`
