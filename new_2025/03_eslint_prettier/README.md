# ESLint + Prettier + Husky Setup

Конфигурация для автоматического контроля качества кода.

## 🔧 Что включено

- **ESLint** - статический анализ кода
- **Prettier** - автоформатирование
- **Husky** - Git hooks
- **lint-staged** - проверка только staged файлов

## 📦 Установка

```bash
npm install --save-dev eslint eslint-config-airbnb-base eslint-config-prettier \
  eslint-plugin-import eslint-plugin-node prettier husky lint-staged
```

## 🚀 Использование

### Проверка кода

```bash
npm run lint          # Проверить код
npm run lint:fix      # Исправить автоматически
```

### Форматирование

```bash
npm run format        # Отформатировать все файлы
npm run format:check  # Проверить форматирование
```

### Git Hooks

```bash
npm run prepare       # Установить Husky
```

После установки при каждом `git commit`:

1. Автоматически запустится ESLint
2. Prettier отформатирует код
3. Коммит пройдёт только если нет ошибок

## ⚙️ Конфигурация

### .eslintrc.js

Основные правила:

- Airbnb style guide
- Node.js environment
- Prettier integration
- Custom rules для Mongoose, async/await

### .prettierrc

Форматирование:

- Single quotes
- Semicolons
- 2 spaces indent
- 100 char line width

### Husky + lint-staged

Pre-commit hook:

- Проверяет только изменённые файлы
- Автоисправление если возможно
- Блокирует коммит при ошибках

## 🎯 Best Practices

### ✅ Правильно

```javascript
// Используем const/let, не var
const user = await User.findById(id);

// Async/await вместо callbacks
const createUser = async (data) => {
  const user = await User.create(data);
  return user;
};

// Деструктуризация
const { name, email } = req.body;

// Arrow functions
const getUsers = () => User.find();

// Proper error handling
if (!user) {
  throw ApiError.notFound('User not found');
}
```

### ❌ Неправильно

```javascript
// var вместо const/let
var user = User.findById(id);

// Callback hell
User.findById(id, function (err, user) {
  if (err) {
    // ...
  }
});

// Нет обработки ошибок
const user = await User.findById(id);
res.json(user); // Что если user === null?

// Пустые catch блоки
try {
  await something();
} catch (err) {
  // Игнорируем ошибку
}
```

## 🔍 Полезные команды

```bash
# Проверить конкретный файл
eslint src/app.js

# Исправить конкретный файл
eslint src/app.js --fix

# Показать правила
eslint --print-config .eslintrc.js

# Отключить правило для строки
// eslint-disable-next-line no-console
console.log('Debug');

# Отключить правило для файла
/* eslint-disable no-console */
```

## 📚 Интеграция с VS Code

Создайте `.vscode/settings.json`:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.validate": ["javascript"]
}
```

Установите расширения:

- ESLint (dbaeumer.vscode-eslint)
- Prettier (esbenp.prettier-vscode)

## 🎨 Кастомизация

### Отключить правило

```javascript
// .eslintrc.js
rules: {
  'no-console': 'off', // Разрешить console
}
```

### Добавить исключение

```javascript
// .eslintignore
dist/
coverage/
*.config.js
```

## 🔗 Ссылки

- [ESLint Rules](https://eslint.org/docs/rules/)
- [Airbnb Style Guide](https://github.com/airbnb/javascript)
- [Prettier Options](https://prettier.io/docs/en/options.html)
- [Husky Docs](https://typicode.github.io/husky/)
