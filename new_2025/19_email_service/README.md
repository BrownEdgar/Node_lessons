# Email Service with Nodemailer

Отправка email с помощью Nodemailer.

## 📧 Возможности

- Отправка email через SMTP
- HTML templates
- Attachments
- Multiple providers (Gmail, SendGrid, AWS SES)
- Email queue для bulk отправки

## 📦 Установка

```bash
npm install nodemailer
npm install ejs handlebars # Для templates
```

## ⚙️ Настройка SMTP

### Gmail

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password # Не обычный пароль!
```

**Gmail App Password:**

1. Google Account → Security
2. 2-Step Verification → App passwords
3. Generate password

### SendGrid

```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASSWORD=your-sendgrid-api-key
```

### AWS SES

```env
SMTP_HOST=email-smtp.us-east-1.amazonaws.com
SMTP_PORT=587
SMTP_USER=your-ses-smtp-username
SMTP_PASSWORD=your-ses-smtp-password
```

## 📝 Использование

### Простой email

```javascript
await sendEmail({
  to: 'user@example.com',
  subject: 'Hello',
  text: 'Plain text',
  html: '<p>HTML content</p>',
});
```

### С вложениями

```javascript
await sendEmail({
  to: 'user@example.com',
  subject: 'Invoice',
  attachments: [
    {
      filename: 'invoice.pdf',
      path: '/path/to/invoice.pdf',
    },
    {
      filename: 'logo.png',
      content: buffer,
      contentType: 'image/png',
    },
  ],
});
```

### Bulk email

```javascript
const emailQueue = require('bull')('email');

// Producer
users.forEach((user) => {
  emailQueue.add({
    to: user.email,
    subject: 'Newsletter',
    html: renderTemplate('newsletter', { user }),
  });
});

// Consumer
emailQueue.process(async (job) => {
  await sendEmail(job.data);
});
```

## 🎨 Email Templates

### EJS Template

```ejs
<!-- templates/welcome.ejs -->
<!DOCTYPE html>
<html>
<head>
  <style>
    .container { max-width: 600px; margin: 0 auto; }
    .button { background: #007bff; color: white; padding: 10px 20px; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Welcome, <%= name %>!</h1>
    <p>Thanks for signing up.</p>
    <a href="<%= dashboardUrl %>" class="button">Get Started</a>
  </div>
</body>
</html>
```

```javascript
const ejs = require('ejs');

const renderTemplate = async (templateName, data) => {
  const html = await ejs.renderFile(`templates/${templateName}.ejs`, data);
  return html;
};
```

## 🔐 Best Practices

1. **Use App Passwords** - не обычные пароли
2. **Queue emails** - не блокировать requests
3. **HTML + Text** - всегда обе версии
4. **Test emails** - используйте Mailtrap для тестов
5. **Rate limiting** - ограничивайте отправку
6. **Track opens/clicks** - добавляйте tracking pixels
7. **Unsubscribe link** - обязательно для bulk emails

## 📊 Email Providers

| Provider | Free Tier    | Best For      |
| -------- | ------------ | ------------- |
| Gmail    | 500/day      | Development   |
| SendGrid | 100/day      | Production    |
| AWS SES  | 62,000/month | High volume   |
| Mailgun  | 5,000/month  | Transactional |
| Postmark | 100/month    | Reliability   |

## 🧪 Testing

### Mailtrap (Development)

```env
SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=your-mailtrap-user
SMTP_PASSWORD=your-mailtrap-password
```

### Jest Mock

```javascript
jest.mock('../services/email.service');

it('should send welcome email', async () => {
  await createUser({ email: 'test@example.com' });

  expect(sendWelcomeEmail).toHaveBeenCalledWith('test@example.com', expect.any(String));
});
```

## 📈 Monitoring

```javascript
emailQueue.on('completed', (job) => {
  logger.info(`Email sent: ${job.data.to}`);
});

emailQueue.on('failed', (job, err) => {
  logger.error(`Email failed: ${job.data.to}`, err);
  // Alert admin
});
```

## 🚀 Advanced

### Transactional vs Marketing

- **Transactional**: password reset, verifications
- **Marketing**: newsletters, promotions

### Email Validation

```javascript
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};
```

### Retry Logic

```javascript
const sendEmailWithRetry = async (options, maxRetries = 3) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await sendEmail(options);
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await delay(1000 * (i + 1)); // Exponential backoff
    }
  }
};
```
