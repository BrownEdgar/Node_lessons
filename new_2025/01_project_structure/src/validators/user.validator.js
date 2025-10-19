const Joi = require('joi');

// Custom Joi validation for MongoDB ObjectId
const objectId = Joi.string().regex(/^[0-9a-fA-F]{24}$/, 'valid ObjectId');

const createUserSchema = {
  body: Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .min(8)
      .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])'))
      .required()
      .messages({
        'string.pattern.base':
          'Password must contain at least one uppercase letter, one lowercase letter, and one number',
      }),
    role: Joi.string().valid('user', 'admin', 'moderator'),
  }),
};

const getUserSchema = {
  params: Joi.object({
    id: objectId.required(),
  }),
};

const updateUserSchema = {
  params: Joi.object({
    id: objectId.required(),
  }),
  body: Joi.object({
    name: Joi.string().min(2).max(50),
    email: Joi.string().email(),
    avatar: Joi.string().uri(),
    role: Joi.string().valid('user', 'admin', 'moderator'),
  }).min(1), // At least one field required
};

module.exports = {
  createUserSchema,
  getUserSchema,
  updateUserSchema,
};
