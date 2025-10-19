# Production-Ready Node.js Application

Полноценное production приложение со всеми best practices.

## 📁 Полная структура

```
production-app/
├── src/
│   ├── config/              # Конфигурация
│   │   ├── database.js
│   │   ├── redis.js
│   │   ├── logger.js
│   │   └── index.js
│   ├── models/              # Mongoose models
│   ├── controllers/         # Route handlers
│   ├── services/            # Business logic
│   ├── middlewares/         # Custom middleware
│   │   ├── auth.js
│   │   ├── errorHandler.js
│   │   ├── validate.js
│   │   ├── rateLimiter.js
│   │   └── cache.js
│   ├── validators/          # Joi/Zod schemas
│   ├── routes/              # API routes
│   ├── utils/               # Helper functions
│   │   ├── ApiError.js
│   │   ├── catchAsync.js
│   │   ├── logger.js
│   │   └── email.js
│   ├── jobs/                # Background jobs
│   │   ├── email.job.js
│   │   └── cleanup.job.js
│   ├── queues/              # Bull queues
│   ├── app.js               # Express setup
│   └── server.js            # Server entry
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── migrations/              # DB migrations
├── seeders/                 # Initial data
├── docs/                    # Documentation
│   ├── api/                 # API docs
│   └── architecture.md
├── scripts/                 # Utility scripts
│   ├── seed.js
│   └── cleanup.js
├── logs/                    # Application logs
├── uploads/                 # File uploads
├── .github/
│   └── workflows/
│       └── ci.yml
├── docker-compose.yml
├── Dockerfile
├── .dockerignore
├── .env.example
├── .gitignore
├── .eslintrc.js
├── .prettierrc
├── jest.config.js
├── ecosystem.config.js      # PM2 config
├── package.json
└── README.md
```

## 🎯 Ключевые особенности

### 1. Security

```javascript
// helmet для HTTP headers
app.use(
  helmet({
    contentSecurityPolicy: true,
    crossOriginEmbedderPolicy: true,
    crossOriginOpenerPolicy: true,
    crossOriginResourcePolicy: true,
    dnsPrefetchControl: true,
    frameguard: true,
    hidePoweredBy: true,
    hsts: true,
    ieNoOpen: true,
    noSniff: true,
    originAgentCluster: true,
    permittedCrossDomainPolicies: true,
    referrerPolicy: true,
    xssFilter: true,
  })
);

// Rate limiting
app.use('/api/', apiLimiter);
app.use('/auth/', authLimiter);

// CORS whitelist
app.use(
  cors({
    origin: (origin, callback) => {
      if (whitelist.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

// Input sanitization
app.use(mongoSanitize());
app.use(xss());

// Request size limits
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
```

### 2. Logging

```javascript
const logger = winston.createLogger({
  level: config.env === 'production' ? 'info' : 'debug',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
    new winston.transports.File({
      filename: 'logs/combined.log',
      maxsize: 5242880,
      maxFiles: 5,
    }),
  ],
});

// Morgan для HTTP logs
app.use(
  morgan('combined', {
    stream: { write: (message) => logger.info(message.trim()) },
  })
);
```

### 3. Error Handling

```javascript
// Centralized error handling
class AppError extends Error {
  constructor(statusCode, message, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

// Global error handler
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  if (config.env === 'development') {
    res.status(err.statusCode).json({
      status: 'error',
      error: err,
      message: err.message,
      stack: err.stack,
    });
  } else {
    // Production - не показываем детали
    if (err.isOperational) {
      res.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    } else {
      logger.error('ERROR 💥', err);
      res.status(500).json({
        status: 'error',
        message: 'Something went wrong',
      });
    }
  }
});
```

### 4. Health Checks

```javascript
app.get('/health', async (req, res) => {
  const healthCheck = {
    uptime: process.uptime(),
    timestamp: Date.now(),
    status: 'OK',
    services: {},
  };

  try {
    // MongoDB
    await mongoose.connection.db.admin().ping();
    healthCheck.services.mongodb = 'healthy';
  } catch (error) {
    healthCheck.services.mongodb = 'unhealthy';
    healthCheck.status = 'DEGRADED';
  }

  try {
    // Redis
    await redis.ping();
    healthCheck.services.redis = 'healthy';
  } catch (error) {
    healthCheck.services.redis = 'unhealthy';
    healthCheck.status = 'DEGRADED';
  }

  res.status(healthCheck.status === 'OK' ? 200 : 503).json(healthCheck);
});

app.get('/health/ready', async (req, res) => {
  // Kubernetes readiness probe
  if (mongoose.connection.readyState === 1) {
    res.status(200).send('Ready');
  } else {
    res.status(503).send('Not ready');
  }
});

app.get('/health/live', (req, res) => {
  // Kubernetes liveness probe
  res.status(200).send('Live');
});
```

### 5. Graceful Shutdown

```javascript
const gracefulShutdown = (signal) => {
  logger.info(`${signal} received, shutting down gracefully`);

  server.close(async () => {
    logger.info('HTTP server closed');

    // Close database connections
    await mongoose.connection.close(false);
    logger.info('MongoDB connection closed');

    // Close Redis
    await redis.quit();
    logger.info('Redis connection closed');

    // Close queues
    await emailQueue.close();
    logger.info('Job queues closed');

    process.exit(0);
  });

  // Force shutdown after timeout
  setTimeout(() => {
    logger.error('Forcing shutdown after timeout');
    process.exit(1);
  }, 30000);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

process.on('uncaughtException', (err) => {
  logger.error('UNCAUGHT EXCEPTION! 💥', err);
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  logger.error('UNHANDLED REJECTION! 💥', err);
  server.close(() => process.exit(1));
});
```

### 6. Monitoring & Metrics

```javascript
// Prometheus metrics
const promClient = require('prom-client');

const register = new promClient.Registry();
promClient.collectDefaultMetrics({ register });

// Custom metrics
const httpRequestDuration = new promClient.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status'],
  registers: [register],
});

app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    httpRequestDuration.observe(
      {
        method: req.method,
        route: req.route?.path || req.path,
        status: res.statusCode,
      },
      duration
    );
  });
  next();
});

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});
```

### 7. PM2 Configuration

```javascript
// ecosystem.config.js
module.exports = {
  apps: [
    {
      name: 'api',
      script: './src/server.js',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      error_file: './logs/pm2-error.log',
      out_file: './logs/pm2-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      autorestart: true,
      max_memory_restart: '1G',
      watch: false,
      ignore_watch: ['node_modules', 'logs', 'uploads'],
      max_restarts: 10,
      min_uptime: '10s',
      listen_timeout: 5000,
      kill_timeout: 5000,
    },
  ],
};
```

## 🚀 Deployment Checklist

### Environment Variables

- [ ] All secrets in environment variables
- [ ] `.env.example` документирован
- [ ] No hardcoded credentials

### Security

- [ ] Helmet configured
- [ ] Rate limiting enabled
- [ ] CORS whitelist configured
- [ ] Input validation
- [ ] SQL/NoSQL injection protection
- [ ] XSS protection
- [ ] CSRF tokens (если нужно)
- [ ] Secrets rotation plan

### Performance

- [ ] Database indexes
- [ ] Redis caching
- [ ] Compression enabled
- [ ] CDN для static files
- [ ] Connection pooling
- [ ] Query optimization

### Monitoring

- [ ] Error tracking (Sentry)
- [ ] APM (New Relic, DataDog)
- [ ] Logging aggregation
- [ ] Health checks
- [ ] Alerts configured

### Backup & Recovery

- [ ] Database backups automated
- [ ] Backup restoration tested
- [ ] Disaster recovery plan
- [ ] Data retention policy

### Testing

- [ ] Unit tests >80% coverage
- [ ] Integration tests
- [ ] E2E tests
- [ ] Load testing
- [ ] Security testing

### Documentation

- [ ] API documentation (Swagger)
- [ ] README comprehensive
- [ ] Architecture documented
- [ ] Runbook for operations

### CI/CD

- [ ] Automated tests on PR
- [ ] Automated deployment
- [ ] Rollback mechanism
- [ ] Blue-green deployment

## 📊 Metrics to Monitor

1. **Application**
   - Response times
   - Error rates
   - Request throughput
   - Memory usage
   - CPU usage

2. **Database**
   - Query performance
   - Connection pool
   - Slow queries
   - Replication lag

3. **Redis**
   - Hit/miss ratio
   - Memory usage
   - Eviction count

4. **Business**
   - User signups
   - Active users
   - Conversion rates
   - Revenue

## 🎓 Recommended Reading

- [The Twelve-Factor App](https://12factor.net/)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Site Reliability Engineering](https://sre.google/)
