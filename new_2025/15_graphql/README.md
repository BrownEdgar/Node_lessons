# GraphQL with Apollo Server

Современное API на GraphQL вместо REST.

## 🎯 Почему GraphQL?

### ✅ Преимущества

- **Точные запросы** - клиент получает только нужные поля
- **Один endpoint** - `/graphql` вместо множества REST endpoints
- **Type safety** - строгая типизация из коробки
- **No over/under-fetching** - нет лишних или недостающих данных
- **Introspection** - самодокументирующееся API
- **Real-time** - subscriptions для WebSocket

### ❌ Когда использовать REST

- Простое CRUD API
- Caching на HTTP уровне
- File uploads (проще с REST)
- Команда не знакома с GraphQL

## 📦 Установка

```bash
npm install apollo-server-express graphql
npm install @graphql-tools/schema graphql-subscriptions
```

## 🏗️ Структура

```
src/
├── schema/
│   ├── typeDefs.js      # GraphQL schema
│   ├── resolvers/       # Query/Mutation resolvers
│   │   ├── user.js
│   │   ├── post.js
│   │   └── index.js
│   └── directives/      # Custom directives
├── context.js           # GraphQL context
└── server.js
```

## 📝 Schema Design

### Types

```graphql
type User {
  id: ID!
  name: String!
  email: String!
  posts: [Post!]!
}
```

### Queries

```graphql
type Query {
  user(id: ID!): User
  users(limit: Int, offset: Int): [User!]!
}
```

### Mutations

```graphql
type Mutation {
  createUser(input: CreateUserInput!): User!
  updateUser(id: ID!, input: UpdateUserInput!): User!
}
```

### Subscriptions

```graphql
type Subscription {
  userCreated: User!
  postUpdated(id: ID!): Post!
}
```

## 🔍 Query Examples

### Basic Query

```graphql
query {
  user(id: "123") {
    name
    email
  }
}
```

### Nested Query

```graphql
query {
  user(id: "123") {
    name
    posts {
      title
      comments {
        content
        author {
          name
        }
      }
    }
  }
}
```

### Variables

```graphql
query GetUser($id: ID!) {
  user(id: $id) {
    name
    email
  }
}

# Variables
{
  "id": "123"
}
```

### Fragments

```graphql
fragment UserFields on User {
  id
  name
  email
}

query {
  user(id: "123") {
    ...UserFields
  }
}
```

## 🔐 Authentication

```javascript
// Context с авторизацией
const context = async ({ req }) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  const user = await verifyToken(token);

  return { user };
};

// Resolver с проверкой
const resolvers = {
  Query: {
    me: (parent, args, context) => {
      if (!context.user) {
        throw new Error('Not authenticated');
      }
      return context.user;
    },
  },
};
```

## 🎨 Advanced Features

### DataLoader (N+1 problem)

```javascript
const userLoader = new DataLoader(async (ids) => {
  const users = await User.find({ _id: { $in: ids } });
  return ids.map((id) => users.find((u) => u.id === id));
});
```

### Custom Directives

```graphql
directive @auth(requires: Role) on FIELD_DEFINITION

type Query {
  adminData: String @auth(requires: ADMIN)
}
```

### Subscriptions

```javascript
const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();

// Publish
pubsub.publish('USER_CREATED', { userCreated: newUser });

// Subscribe
const resolvers = {
  Subscription: {
    userCreated: {
      subscribe: () => pubsub.asyncIterator(['USER_CREATED']),
    },
  },
};
```

## 📊 Tools

- **Apollo Studio** - GraphQL IDE и monitoring
- **GraphiQL** - In-browser IDE
- **Apollo Client** - Frontend клиент
- **GraphQL Code Generator** - Генерация TypeScript types

## ⚡ Performance

### Caching

- Query result caching
- DataLoader для batch queries
- Persistent queries

### Security

- Query depth limiting
- Query complexity analysis
- Rate limiting
- Authentication/Authorization

## 🆚 GraphQL vs REST

| Feature        | GraphQL          | REST                       |
| -------------- | ---------------- | -------------------------- |
| Endpoints      | 1 (`/graphql`)   | Много (`/users`, `/posts`) |
| Over-fetching  | ❌ Нет           | ✅ Часто                   |
| Under-fetching | ❌ Нет           | ✅ Часто                   |
| Versioning     | ❌ Не нужно      | ✅ Нужно (`/v1`, `/v2`)    |
| Real-time      | ✅ Subscriptions | ❌ Сложно                  |
| Caching        | ⚠️ Сложнее       | ✅ HTTP caching            |
| Learning curve | ⚠️ Выше          | ✅ Ниже                    |
