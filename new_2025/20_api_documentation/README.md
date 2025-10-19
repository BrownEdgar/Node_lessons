# API Documentation with Swagger/OpenAPI

Автоматическая документация API с интерактивным UI.

## 🎯 Зачем нужна документация?

- **Frontend разработчики** знают как использовать API
- **Тестирование** - можно тестировать прямо в браузере
- **Актуальность** - документация в коде, всегда синхронизирована
- **Стандартизация** - OpenAPI standard

## 📦 Установка

```bash
npm install swagger-jsdoc swagger-ui-express
npm install --save-dev @types/swagger-jsdoc @types/swagger-ui-express
```

## 🚀 Setup

```javascript
const { specs, swaggerUi } = require('./swagger');

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(specs, {
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'API Documentation',
  })
);
```

Открыть: `http://localhost:3000/api-docs`

## 📝 Документирование Routes

### Basic Route

```javascript
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/users', getAllUsers);
```

### With Parameters

```javascript
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 */
```

### With Request Body

```javascript
/**
 * @swagger
 * /users:
 *   post:
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 */
```

### With Authentication

```javascript
/**
 * @swagger
 * /admin/users:
 *   get:
 *     security:
 *       - bearerAuth: []
 */
```

## 🔐 Security Schemes

### Bearer Token

```yaml
components:
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
```

### API Key

```yaml
components:
  securitySchemes:
    apiKey:
      type: apiKey
      in: header
      name: X-API-Key
```

### OAuth2

```yaml
components:
  securitySchemes:
    oauth2:
      type: oauth2
      flows:
        authorizationCode:
          authorizationUrl: https://example.com/oauth/authorize
          tokenUrl: https://example.com/oauth/token
          scopes:
            read: Read access
            write: Write access
```

## 📊 Schema Definitions

### User Schema

```yaml
components:
  schemas:
    User:
      type: object
      required:
        - name
        - email
      properties:
        id:
          type: string
          example: 507f1f77bcf86cd799439011
        name:
          type: string
          minLength: 2
          maxLength: 50
        email:
          type: string
          format: email
        role:
          type: string
          enum: [user, admin]
        createdAt:
          type: string
          format: date-time
```

### Error Schema

```yaml
components:
  schemas:
    Error:
      type: object
      properties:
        success:
          type: boolean
        code:
          type: integer
        message:
          type: string
```

## 🎨 Reusable Responses

```yaml
components:
  responses:
    UnauthorizedError:
      description: Access token is missing or invalid
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'

    NotFoundError:
      description: Resource not found
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
```

Usage:

```javascript
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     responses:
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
```

## 🔍 Advanced Features

### Multiple Examples

```javascript
/**
 * @swagger
 * /users:
 *   post:
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *           examples:
 *             user:
 *               value:
 *                 name: John Doe
 *                 email: john@example.com
 *             admin:
 *               value:
 *                 name: Admin User
 *                 email: admin@example.com
 *                 role: admin
 */
```

### File Upload

```javascript
/**
 * @swagger
 * /upload:
 *   post:
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 */
```

### Pagination

```javascript
/**
 * @swagger
 * /users:
 *   get:
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 */
```

## 🛠️ Tools & Generators

### Swagger Editor

- Online: https://editor.swagger.io/
- Валидация YAML/JSON

### Swagger Codegen

```bash
npm install -g swagger-codegen
swagger-codegen generate -i swagger.json -l typescript-node
```

### OpenAPI Generator

```bash
npm install @openapitools/openapi-generator-cli -g
openapi-generator-cli generate -i swagger.json -g typescript-axios
```

## 📚 Best Practices

1. **Consistent naming** - RESTful conventions
2. **Complete schemas** - все поля с описаниями
3. **Examples** - реальные примеры данных
4. **Error responses** - документируйте все ошибки
5. **Versioning** - включайте версию API
6. **Security** - документируйте аутентификацию
7. **Tags** - группируйте endpoints

## 🔗 Alternatives

- **Postman** - коллекции можно экспортировать в OpenAPI
- **API Blueprint** - markdown-based
- **RAML** - YAML-based
- **GraphQL** - встроенная introspection
