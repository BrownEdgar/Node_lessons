# Database Migrations

Управление изменениями схемы базы данных.

## 🎯 Зачем нужны миграции?

### Проблемы без миграций

- ❌ Ручные изменения БД на production
- ❌ Несинхронизированная БД между окружениями
- ❌ Нет истории изменений схемы
- ❌ Сложно откатить изменения

### С миграциями

- ✅ Автоматизация изменений
- ✅ Версионирование схемы
- ✅ Возможность rollback
- ✅ Code review изменений БД

## 📦 Инструменты

### MongoDB

- **migrate-mongo** - простой и легковесный
- **mongoose** - встроенная миграция (ограниченная)

### PostgreSQL/MySQL

- **Sequelize** - популярный ORM
- **TypeORM** - для TypeScript
- **Knex.js** - query builder с миграциями

## 🍃 MongoDB Migrations (migrate-mongo)

### Установка

```bash
npm install migrate-mongo
npx migrate-mongo init
```

### Конфигурация

```javascript
// migrate-mongo-config.js
module.exports = {
  mongodb: {
    url: process.env.MONGODB_URI,
    databaseName: 'myapp',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  migrationsDir: 'migrations',
  changelogCollectionName: 'migrations',
  migrationFileExtension: '.js',
};
```

### Создание миграции

```bash
npx migrate-mongo create add-email-index
```

### Пример миграции

```javascript
// migrations/20240101000000-add-email-index.js
module.exports = {
  async up(db, client) {
    // Создание индекса
    await db.collection('users').createIndex({ email: 1 }, { unique: true });

    console.log('Email index created');
  },

  async down(db, client) {
    // Откат - удаление индекса
    await db.collection('users').dropIndex('email_1');

    console.log('Email index dropped');
  },
};
```

### Примеры операций

#### Добавление поля

```javascript
module.exports = {
  async up(db) {
    await db
      .collection('users')
      .updateMany({ isActive: { $exists: false } }, { $set: { isActive: true } });
  },

  async down(db) {
    await db.collection('users').updateMany({}, { $unset: { isActive: '' } });
  },
};
```

#### Переименование поля

```javascript
module.exports = {
  async up(db) {
    await db.collection('users').updateMany({}, { $rename: { username: 'name' } });
  },

  async down(db) {
    await db.collection('users').updateMany({}, { $rename: { name: 'username' } });
  },
};
```

#### Изменение типа данных

```javascript
module.exports = {
  async up(db) {
    // String → Number
    const users = await db
      .collection('users')
      .find({
        age: { $type: 'string' },
      })
      .toArray();

    for (const user of users) {
      await db
        .collection('users')
        .updateOne({ _id: user._id }, { $set: { age: parseInt(user.age, 10) } });
    }
  },

  async down(db) {
    // Number → String
    await db
      .collection('users')
      .updateMany({ age: { $type: 'number' } }, [{ $set: { age: { $toString: '$age' } } }]);
  },
};
```

#### Создание коллекции

```javascript
module.exports = {
  async up(db) {
    await db.createCollection('logs', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['message', 'level', 'timestamp'],
          properties: {
            message: { bsonType: 'string' },
            level: { enum: ['info', 'warn', 'error'] },
            timestamp: { bsonType: 'date' },
          },
        },
      },
    });
  },

  async down(db) {
    await db.collection('logs').drop();
  },
};
```

### Запуск миграций

```bash
# Применить все миграции
npx migrate-mongo up

# Откатить последнюю
npx migrate-mongo down

# Статус миграций
npx migrate-mongo status
```

## 🐘 Sequelize Migrations

### Установка

```bash
npm install sequelize sequelize-cli
npx sequelize-cli init
```

### Создание миграции

```bash
npx sequelize-cli migration:generate --name add-users-table
```

### Пример миграции

```javascript
// migrations/20240101000000-add-users-table.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      role: {
        type: Sequelize.ENUM('user', 'admin'),
        defaultValue: 'user',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });

    // Добавить индекс
    await queryInterface.addIndex('users', ['email']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  },
};
```

### Изменение таблицы

```javascript
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Добавить колонку
    await queryInterface.addColumn('users', 'phoneNumber', {
      type: Sequelize.STRING(20),
      allowNull: true,
    });

    // Изменить колонку
    await queryInterface.changeColumn('users', 'name', {
      type: Sequelize.STRING(200),
      allowNull: false,
    });

    // Удалить колонку
    await queryInterface.removeColumn('users', 'oldField');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'phoneNumber');
    // ... откат других изменений
  },
};
```

### Foreign Keys

```javascript
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('posts', 'userId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('posts', 'userId');
  },
};
```

### Запуск миграций

```bash
# Применить все миграции
npx sequelize-cli db:migrate

# Откатить последнюю
npx sequelize-cli db:migrate:undo

# Откатить все
npx sequelize-cli db:migrate:undo:all

# Статус
npx sequelize-cli db:migrate:status
```

## 🌱 Seeders (начальные данные)

### MongoDB

```javascript
// migrations/20240101000001-seed-admin-user.js
const bcrypt = require('bcryptjs');

module.exports = {
  async up(db) {
    const hashedPassword = await bcrypt.hash('admin123', 10);

    await db.collection('users').insertOne({
      name: 'Admin',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'admin',
      createdAt: new Date(),
    });
  },

  async down(db) {
    await db.collection('users').deleteOne({
      email: 'admin@example.com',
    });
  },
};
```

### Sequelize Seeders

```bash
npx sequelize-cli seed:generate --name demo-users
```

```javascript
// seeders/20240101000000-demo-users.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'hashed_password',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'hashed_password',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
```

```bash
npx sequelize-cli db:seed:all
npx sequelize-cli db:seed:undo
```

## 📊 Best Practices

### 1. Именование миграций

```bash
# Хорошо
20240101120000-add-email-to-users.js
20240101130000-create-posts-table.js
20240101140000-add-index-to-users-email.js

# Плохо
migration1.js
update.js
fix.js
```

### 2. Атомарные миграции

```javascript
// ✅ Одна задача = одна миграция
// migrations/001-add-email.js
// migrations/002-add-index.js

// ❌ Много изменений в одной миграции
// migrations/001-everything.js
```

### 3. Всегда пишите down()

```javascript
// ✅ С rollback
module.exports = {
  up: async (db) => {
    /* ... */
  },
  down: async (db) => {
    /* rollback */
  },
};

// ❌ Без rollback
module.exports = {
  up: async (db) => {
    /* ... */
  },
  down: async (db) => {
    throw new Error('irreversible');
  },
};
```

### 4. Тестируйте миграции

```bash
# Тест full cycle
npm run migrate:up
npm run migrate:down
npm run migrate:up
```

### 5. Backup перед миграцией

```bash
# Production миграции
mongodump --uri=$MONGODB_URI
npx migrate-mongo up
```

## 🚀 CI/CD Integration

### package.json

```json
{
  "scripts": {
    "migrate": "migrate-mongo up",
    "migrate:down": "migrate-mongo down",
    "migrate:status": "migrate-mongo status",
    "migrate:create": "migrate-mongo create"
  }
}
```

### Docker

```dockerfile
# Run migrations on container start
CMD ["sh", "-c", "npm run migrate && npm start"]
```

### GitHub Actions

```yaml
- name: Run migrations
  run: |
    npm run migrate
  env:
    MONGODB_URI: ${{ secrets.MONGODB_URI }}
```

## ⚠️ Production Tips

1. **Backup first** - всегда делайте backup
2. **Test on staging** - сначала на staging
3. **Monitor** - следите за выполнением
4. **Rollback plan** - готовьте план отката
5. **Off-peak hours** - мигрируйте в нерабочее время
6. **Lock mechanism** - предотвращайте параллельный запуск
