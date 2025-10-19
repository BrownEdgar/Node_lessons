# TypeScript with Node.js + Express

Современный подход к типизированному Node.js приложению.

## 🎯 Зачем TypeScript?

- **Type Safety** - ошибки на этапе компиляции
- **Better IDE Support** - автокомплит, рефакторинг
- **Documentation** - типы как документация
- **Easier Refactoring** - уверенность при изменениях
- **Modern Features** - последние фичи JavaScript

## 📦 Установка

```bash
npm install --save-dev typescript @types/node @types/express \
  @types/mongoose ts-node ts-node-dev
```

## ⚙️ Конфигурация

См. `tsconfig.json` - оптимальная конфигурация для Node.js

## 🚀 Использование

```bash
npm run dev      # Development с hot reload
npm run build    # Компиляция в JS
npm start        # Production
```

## 📝 Примеры

### Типизированные модели

```typescript
interface IUser extends Document {
  name: string;
  email: string;
  role: 'user' | 'admin';
}
```

### Типизированные контроллеры

```typescript
const getUser = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  // ...
};
```

## 🔍 Best Practices

- Используйте строгий режим (`strict: true`)
- Избегайте `any` - используйте `unknown`
- Создавайте interfaces для всех моделей
- Типизируйте request/response
- Используйте enums для constants
