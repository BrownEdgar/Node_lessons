const rateLimit = require('express-rate-limit');
const RedisStore = require('rate-limit-redis');

const redis = require('../config/redis');

/**
 * General API rate limiter
 * 100 requests per 15 minutes
 */
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true, // Return rate limit info in headers
  legacyHeaders: false,
  store: new RedisStore({
    client: redis,
    prefix: 'rl:api:',
  }),
});

/**
 * Strict rate limiter for authentication routes
 * 5 requests per 15 minutes
 */
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  skipSuccessfulRequests: true, // Don't count successful requests
  message: 'Too many login attempts, please try again after 15 minutes.',
  store: new RedisStore({
    client: redis,
    prefix: 'rl:auth:',
  }),
});

/**
 * Create account limiter
 * 3 accounts per hour per IP
 */
const createAccountLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3,
  message: 'Too many accounts created from this IP, please try again after an hour.',
  skipSuccessfulRequests: false,
  store: new RedisStore({
    client: redis,
    prefix: 'rl:register:',
  }),
});

/**
 * Password reset limiter
 * 3 requests per hour
 */
const passwordResetLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3,
  message: 'Too many password reset requests, please try again after an hour.',
  store: new RedisStore({
    client: redis,
    prefix: 'rl:password:',
  }),
});

/**
 * Custom rate limiter factory
 */
const createRateLimiter = (options) =>
  rateLimit({
    ...options,
    store: new RedisStore({
      client: redis,
      prefix: options.prefix || 'rl:custom:',
    }),
  });

module.exports = {
  apiLimiter,
  authLimiter,
  createAccountLimiter,
  passwordResetLimiter,
  createRateLimiter,
};
