const dotenv = require('dotenv');
const Joi = require('joi');

// Load environment variables
dotenv.config();

// Environment validation schema
const envSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
  PORT: Joi.number().default(3000),
  MONGODB_URI: Joi.string().required().description('MongoDB connection string'),
  JWT_SECRET: Joi.string().required().min(32).description('JWT secret key'),
  JWT_EXPIRE: Joi.string().default('15m'),
  REDIS_HOST: Joi.string().default('localhost'),
  REDIS_PORT: Joi.number().default(6379),
  ALLOWED_ORIGINS: Joi.string().default('http://localhost:3000'),
  LOG_LEVEL: Joi.string().valid('error', 'warn', 'info', 'debug').default('info'),
}).unknown(); // Allow other env variables

// Validate environment variables
const { error, value: envVars } = envSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,

  // Database
  database: {
    uri: envVars.MONGODB_URI,
    options: {
      // Удалены устаревшие опции useNewUrlParser, useUnifiedTopology
    },
  },

  // JWT
  jwt: {
    secret: envVars.JWT_SECRET,
    refreshSecret: envVars.JWT_REFRESH_SECRET,
    accessExpirationMinutes: envVars.JWT_EXPIRE,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRE,
  },

  // Redis
  redis: {
    host: envVars.REDIS_HOST,
    port: envVars.REDIS_PORT,
    password: envVars.REDIS_PASSWORD || undefined,
  },

  // CORS
  cors: {
    origins: envVars.ALLOWED_ORIGINS.split(',').map((origin) => origin.trim()),
  },

  // Logging
  logging: {
    level: envVars.LOG_LEVEL,
    filePath: envVars.LOG_FILE_PATH || 'logs/app.log',
  },

  // Rate limiting
  rateLimiting: {
    windowMs: parseInt(envVars.RATE_LIMIT_WINDOW_MS, 10) || 15 * 60 * 1000,
    max: parseInt(envVars.RATE_LIMIT_MAX_REQUESTS, 10) || 100,
  },

  // Email
  email: {
    smtp: {
      host: envVars.SMTP_HOST,
      port: envVars.SMTP_PORT,
      auth: {
        user: envVars.SMTP_USER,
        pass: envVars.SMTP_PASSWORD,
      },
    },
    from: envVars.EMAIL_FROM,
  },

  // AWS
  aws: {
    region: envVars.AWS_REGION,
    accessKeyId: envVars.AWS_ACCESS_KEY_ID,
    secretAccessKey: envVars.AWS_SECRET_ACCESS_KEY,
    s3Bucket: envVars.AWS_S3_BUCKET,
  },
};

// Freeze config to prevent modifications
Object.freeze(config);

module.exports = config;
