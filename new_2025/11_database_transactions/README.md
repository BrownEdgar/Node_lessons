# Database Transactions

ACID транзакции в MongoDB и PostgreSQL.

## 🎯 Что такое транзакция?

Группа операций, которые должны выполниться **все вместе или не выполниться вообще**.

### ACID свойства

- **Atomicity** - всё или ничего
- **Consistency** - данные всегда валидны
- **Isolation** - транзакции не влияют друг на друга
- **Durability** - изменения сохраняются навсегда

## 💰 Классический пример: перевод денег

### ❌ БЕЗ транзакции (опасно!)

```javascript
// Что если упадёт между операциями?
await Account.updateOne({ _id: fromId }, { $inc: { balance: -100 } });
// 💥 Сервер упал - деньги исчезли!
await Account.updateOne({ _id: toId }, { $inc: { balance: 100 } });
```

### ✅ С транзакцией (безопасно)

```javascript
const session = await mongoose.startSession();
session.startTransaction();

try {
  await Account.updateOne({ _id: fromId }, { $inc: { balance: -100 } }, { session });

  await Account.updateOne({ _id: toId }, { $inc: { balance: 100 } }, { session });

  await session.commitTransaction(); // Всё хорошо - сохраняем
} catch (error) {
  await session.abortTransaction(); // Ошибка - откатываем всё
  throw error;
} finally {
  session.endSession();
}
```

## 🍃 MongoDB Transactions

### Требования

- MongoDB 4.0+
- Replica Set (не standalone)
- WiredTiger storage engine

### Простой пример

```javascript
const transferMoney = async (fromId, toId, amount) => {
  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async () => {
      const from = await Account.findById(fromId).session(session);

      if (from.balance < amount) {
        throw new Error('Insufficient balance');
      }

      await Account.updateOne({ _id: fromId }, { $inc: { balance: -amount } }, { session });

      await Account.updateOne({ _id: toId }, { $inc: { balance: amount } }, { session });

      // Логирование транзакции
      await TransactionLog.create(
        [
          {
            from: fromId,
            to: toId,
            amount,
            timestamp: new Date(),
          },
        ],
        { session }
      );
    });

    return { success: true };
  } finally {
    session.endSession();
  }
};
```

### withTransaction vs manual

```javascript
// ✅ withTransaction - автоматический retry
await session.withTransaction(async () => {
  // операции
});

// ⚠️ Manual - нужно самому обрабатывать retry
session.startTransaction();
try {
  // операции
  await session.commitTransaction();
} catch (error) {
  await session.abortTransaction();
}
```

## 🐘 PostgreSQL Transactions (Sequelize)

```javascript
const { sequelize } = require('../config/database');

const transferMoney = async (fromId, toId, amount) => {
  const transaction = await sequelize.transaction();

  try {
    const from = await Account.findByPk(fromId, { transaction });

    if (from.balance < amount) {
      throw new Error('Insufficient balance');
    }

    await from.decrement('balance', { by: amount, transaction });

    await Account.increment('balance', {
      by: amount,
      where: { id: toId },
      transaction,
    });

    await transaction.commit();
    return { success: true };
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};
```

### Isolation Levels

```javascript
const transaction = await sequelize.transaction({
  isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
  // READ_UNCOMMITTED - lowest isolation
  // READ_COMMITTED - default
  // REPEATABLE_READ
  // SERIALIZABLE - highest isolation
});
```

## 🎯 Use Cases

### 1. E-commerce Order

```javascript
const createOrder = async (userId, items) => {
  const session = await mongoose.startSession();

  await session.withTransaction(async () => {
    // 1. Create order
    const order = await Order.create(
      [
        {
          user: userId,
          items,
          total: calculateTotal(items),
        },
      ],
      { session }
    );

    // 2. Decrease product stock
    for (const item of items) {
      const product = await Product.findById(item.productId).session(session);

      if (product.stock < item.quantity) {
        throw new Error(`${product.name} out of stock`);
      }

      await Product.updateOne(
        { _id: item.productId },
        { $inc: { stock: -item.quantity } },
        { session }
      );
    }

    // 3. Create invoice
    await Invoice.create(
      [
        {
          order: order[0]._id,
          amount: order[0].total,
        },
      ],
      { session }
    );
  });
};
```

### 2. User Registration with Profile

```javascript
const registerUser = async (userData) => {
  const session = await mongoose.startSession();

  await session.withTransaction(async () => {
    // Create user
    const user = await User.create(
      [
        {
          email: userData.email,
          password: userData.password,
        },
      ],
      { session }
    );

    // Create profile
    await Profile.create(
      [
        {
          user: user[0]._id,
          name: userData.name,
          bio: userData.bio,
        },
      ],
      { session }
    );

    // Create settings
    await Settings.create(
      [
        {
          user: user[0]._id,
          notifications: true,
          privacy: 'public',
        },
      ],
      { session }
    );

    // Send welcome email (не откатывается!)
    await emailQueue.add({
      to: userData.email,
      template: 'welcome',
    });
  });
};
```

### 3. Multi-step Update

```javascript
const updateUserProfile = async (userId, updates) => {
  const session = await mongoose.startSession();

  await session.withTransaction(async () => {
    // Update user
    await User.updateOne({ _id: userId }, { $set: updates.user }, { session });

    // Update profile
    await Profile.updateOne({ user: userId }, { $set: updates.profile }, { session });

    // Log change
    await AuditLog.create(
      [
        {
          user: userId,
          action: 'profile_update',
          changes: updates,
        },
      ],
      { session }
    );
  });
};
```

## ⚡ Performance Tips

### 1. Keep transactions short

```javascript
// ❌ Плохо - долгая транзакция
await session.withTransaction(async () => {
  await doSomething();
  await externalAPICall(); // Может быть медленным!
  await updateDB();
});

// ✅ Хорошо - быстрая транзакция
const data = await externalAPICall();
await session.withTransaction(async () => {
  await doSomething();
  await updateDB(data);
});
```

### 2. Batch операции

```javascript
// ✅ Batch update вместо цикла
await Product.updateMany({ _id: { $in: productIds } }, { $inc: { stock: -1 } }, { session });
```

### 3. Read before write

```javascript
// Проверяем условия перед транзакцией
const user = await User.findById(userId);
if (!user.isActive) {
  throw new Error('User not active');
}

// Теперь быстрая транзакция
await session.withTransaction(async () => {
  // updates
});
```

## 🛡️ Error Handling

```javascript
const safeTransaction = async (fn) => {
  const session = await mongoose.startSession();

  try {
    const result = await session.withTransaction(fn, {
      readConcern: { level: 'snapshot' },
      writeConcern: { w: 'majority' },
      maxCommitTimeMS: 5000, // Timeout
    });
    return result;
  } catch (error) {
    if (error.hasErrorLabel('TransientTransactionError')) {
      // Retry logic
      logger.warn('Transient transaction error, retrying...');
      return safeTransaction(fn);
    }
    throw error;
  } finally {
    session.endSession();
  }
};
```

## 📊 Monitoring

```javascript
// Transaction metrics
const metrics = {
  started: 0,
  committed: 0,
  aborted: 0,
  duration: [],
};

const monitoredTransaction = async (fn) => {
  metrics.started++;
  const startTime = Date.now();

  try {
    const result = await session.withTransaction(fn);
    metrics.committed++;
    metrics.duration.push(Date.now() - startTime);
    return result;
  } catch (error) {
    metrics.aborted++;
    throw error;
  }
};
```

## ⚠️ Common Pitfalls

1. **Забыли session параметр**

```javascript
// ❌ Эта операция НЕ в транзакции!
await User.create({ name: 'John' });
// ✅ Правильно
await User.create([{ name: 'John' }], { session });
```

2. **Долгие транзакции**

- Держат locks
- Могут timeout
- Снижают throughput

3. **External side effects**

```javascript
// ❌ Email отправится даже если transaction rollback!
await session.withTransaction(async () => {
  await Order.create([order], { session });
  await sendEmail(order.email); // Опасно!
});

// ✅ Отправляем после commit
await session.withTransaction(async () => {
  await Order.create([order], { session });
});
await sendEmail(order.email);
```

## 🔍 Testing

```javascript
describe('Transfer Money', () => {
  it('should rollback on insufficient balance', async () => {
    const fromInitial = 50;
    const toInitial = 100;

    const from = await Account.create({ balance: fromInitial });
    const to = await Account.create({ balance: toInitial });

    await expect(transferMoney(from._id, to._id, 100)).rejects.toThrow('Insufficient balance');

    // Verify rollback
    const fromAfter = await Account.findById(from._id);
    const toAfter = await Account.findById(to._id);

    expect(fromAfter.balance).toBe(fromInitial);
    expect(toAfter.balance).toBe(toInitial);
  });
});
```
