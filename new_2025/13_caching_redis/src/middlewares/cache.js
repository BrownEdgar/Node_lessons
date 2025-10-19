const redis = require('../config/redis');
const logger = require('../utils/logger');

/**
 * Cache middleware factory
 * @param {number} duration - Cache duration in seconds
 * @param {function} keyGenerator - Function to generate cache key
 */
const cache =
  (duration = 300, keyGenerator = null) =>
  async (req, res, next) => {
    // Skip caching for non-GET requests
    if (req.method !== 'GET') {
      return next();
    }

    // Generate cache key
    const key = keyGenerator ? keyGenerator(req) : `cache:${req.originalUrl || req.url}`;

    try {
      // Check if data exists in cache
      const cachedData = await redis.get(key);

      if (cachedData) {
        logger.debug(`Cache HIT: ${key}`);
        return res.json(JSON.parse(cachedData));
      }

      // Cache MISS
      logger.debug(`Cache MISS: ${key}`);

      // Store original res.json
      const originalJson = res.json.bind(res);

      // Override res.json to cache response
      res.json = (data) => {
        // Cache the data
        redis.setex(key, duration, JSON.stringify(data)).catch((err) => {
          logger.error('Redis cache error:', err);
        });

        // Send response
        return originalJson(data);
      };

      next();
    } catch (error) {
      logger.error('Cache middleware error:', error);
      // Continue without caching on error
      next();
    }
  };

/**
 * Clear specific cache
 */
const clearCache = async (pattern) => {
  try {
    const keys = await redis.keys(pattern);
    if (keys.length > 0) {
      await redis.del(...keys);
      logger.info(`Cleared ${keys.length} cache keys matching: ${pattern}`);
    }
  } catch (error) {
    logger.error('Clear cache error:', error);
  }
};

/**
 * Clear all cache
 */
const clearAllCache = async () => {
  try {
    await redis.flushdb();
    logger.info('Cleared all cache');
  } catch (error) {
    logger.error('Clear all cache error:', error);
  }
};

/**
 * Cache strategies
 */
const cacheStrategies = {
  // Cache user data for 5 minutes
  user: cache(300, (req) => `cache:user:${req.params.id}`),

  // Cache list data for 1 minute
  list: cache(60, (req) => {
    const { page = 1, limit = 10, sort = '' } = req.query;
    return `cache:${req.baseUrl}:list:${page}:${limit}:${sort}`;
  }),

  // Cache static data for 1 hour
  static: cache(3600),

  // Cache search results for 10 minutes
  search: cache(600, (req) => {
    const query = JSON.stringify(req.query);
    return `cache:search:${Buffer.from(query).toString('base64')}`;
  }),
};

module.exports = {
  cache,
  clearCache,
  clearAllCache,
  cacheStrategies,
};
