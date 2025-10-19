# OAuth Tutorial App

Учебное приложение для изучения Google OAuth аутентификации с использованием Passport.js и MongoDB.

## 🚀 Возможности

- ✅ Google OAuth 2.0 аутентификация
- ✅ Современный и адаптивный UI
- ✅ Сессии пользователей
- ✅ MongoDB интеграция
- ✅ Обработка ошибок
- ✅ Безопасность

## 📋 Требования

- Node.js (версия 14 или выше)
- MongoDB (локальная или облачная)
- Google Cloud Console аккаунт

## 🛠 Установка

1. **Клонируйте репозиторий:**

   ```bash
   git clone <repository-url>
   cd Pasport.js_tutorial
   ```

2. **Установите зависимости:**

   ```bash
   npm install
   ```

3. **Настройте Google OAuth:**
   - Перейдите в [Google Cloud Console](https://console.cloud.google.com/)
   - Создайте новый проект или выберите существующий
   - Включите Google+ API
   - Создайте OAuth 2.0 credentials
   - Добавьте авторизованные URI:
     - `http://localhost:3000/auth/google/redirect`
   - Скопируйте Client ID и Client Secret

4. **Настройте MongoDB:**
   - Создайте базу данных MongoDB (локально или в облаке)
   - Обновите строку подключения в `config/keys.js`

5. **Обновите конфигурацию:**
   Отредактируйте `config/keys.js`:

   ```javascript
   module.exports = {
     google: {
       clientId: 'YOUR_GOOGLE_CLIENT_ID',
       clientSecret: 'YOUR_GOOGLE_CLIENT_SECRET',
     },
     mongodb: {
       dbURI: 'YOUR_MONGODB_CONNECTION_STRING',
     },
   };
   ```

## 🏃‍♂️ Запуск

```bash
npm start
```

Приложение будет доступно по адресу: `http://localhost:3000`

## 📁 Структура проекта

```bash
Pasport.js_tutorial/
├── config/
│   ├── keys.js              # Конфигурация ключей
│   └── passport-setup.js   # Настройка Passport.js
├── models/
│   └── User.js             # Модель пользователя
├── routes/
│   └── auth-routes.js      # Маршруты аутентификации
├── views/
│   ├── home.ejs           # Главная страница
│   ├── login.ejs          # Страница входа
│   └── error.ejs          # Страница ошибок
├── index.js               # Главный файл приложения
├── package.json           # Зависимости
└── README.md             # Документация
```

## 🔧 API Endpoints

| Метод | Путь                    | Описание                  |
| ----- | ----------------------- | ------------------------- |
| GET   | `/`                     | Главная страница          |
| GET   | `/auth/login`           | Страница входа            |
| GET   | `/auth/google`          | Инициация Google OAuth    |
| GET   | `/auth/google/redirect` | Callback для Google OAuth |
| GET   | `/auth/logout`          | Выход из системы          |

## 🎨 UI/UX

Приложение использует современный дизайн с:

- Градиентными фонами
- Стеклянными эффектами (glassmorphism)
- Адаптивной версткой
- Плавными анимациями
- Современной типографикой

## 🔒 Безопасность

- Сессии защищены секретным ключом
- OAuth токены не сохраняются
- Валидация данных пользователя
- Обработка ошибок аутентификации

## 🐛 Отладка

Для отладки включите логирование:

```javascript
// В index.js добавьте:
console.log('User session:', req.user);
```

## 📚 Изучаемые концепции

1. **OAuth 2.0 Flow** - Процесс аутентификации через Google
2. **Passport.js Strategies** - Настройка стратегий аутентификации
3. **Session Management** - Управление сессиями пользователей
4. **MongoDB Integration** - Работа с базой данных
5. **Express Middleware** - Промежуточное ПО
6. **Error Handling** - Обработка ошибок

## 🚀 Развертывание

Для продакшена:

1. Установите переменные окружения
2. Настройте HTTPS
3. Обновите callback URL в Google Console
4. Используйте MongoDB Atlas или другую облачную БД

## 📖 Дополнительные ресурсы

- [Passport.js Documentation](http://www.passportjs.org/)
- [Google OAuth 2.0](https://developers.google.com/identity/protocols/oauth2)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Guide](https://expressjs.com/)

---

**Примечание:** Это учебное приложение. Не используйте в продакшене без дополнительной настройки безопасности.

— Passport "встраивается" в Express и добавляет несколько методов в req:

1. `req.login(user, callback)` — авторизует пользователя;
2. `req.logout(callback)`— выход пользователя (удаляет сессию);
3. `req.isAuthenticated()` — проверяет, вошёл ли пользователь;
4. `req.user` — хранит данные текущего пользователя.
