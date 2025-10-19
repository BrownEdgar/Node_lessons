const Joi = require('joi');

const ApiError = require('../utils/ApiError');

/**
 * Validation middleware factory
 *
 * Использование:
 * const { createUserSchema } = require('../validators/user.validator');
 * router.post('/', validate(createUserSchema), userController.create);
 */
const validate = (schema) => (req, res, next) => {
  // Определяем что валидировать
  const validSchema = {
    body: Joi.object({}),
    query: Joi.object({}),
    params: Joi.object({}),
  };

  // Объединяем со схемой
  Object.assign(validSchema, schema);

  // Валидируем request
  const object = {
    body: req.body,
    query: req.query,
    params: req.params,
  };

  const { value, error } = Joi.object(validSchema)
    .prefs({ errors: { label: 'key' }, abortEarly: false })
    .validate(object);

  if (error) {
    const errorMessage = error.details.map((detail) => detail.message).join(', ');
    return next(ApiError.badRequest(errorMessage));
  }

  // Заменяем request данными после валидации (санитизация)
  Object.assign(req, value);
  return next();
};

module.exports = validate;
