/**
 * Wrapper для async route handlers
 * Автоматически ловит ошибки и передаёт их в error handling middleware
 *
 * Использование:
 * router.get('/', catchAsync(async (req, res) => {
 *   const users = await User.find();
 *   res.json(users);
 * }));
 */

const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => next(err));
};

module.exports = catchAsync;

/**
 * ❌ БЕЗ catchAsync (плохо):
 *
 * router.get('/', async (req, res, next) => {
 *   try {
 *     const users = await User.find();
 *     res.json(users);
 *   } catch (error) {
 *     next(error); // Нужно помнить писать везде
 *   }
 * });
 *
 * ✅ С catchAsync (хорошо):
 *
 * router.get('/', catchAsync(async (req, res) => {
 *   const users = await User.find();
 *   res.json(users);
 * }));
 */
