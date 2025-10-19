const userService = require('../services/user.service');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');

/**
 * Get all users
 */
const getAllUsers = catchAsync(async (req, res) => {
  const users = await userService.getUsers(req.query);

  res.status(200).json({
    success: true,
    results: users.length,
    data: users,
  });
});

/**
 * Get user by ID
 */
const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.id);

  if (!user) {
    throw ApiError.notFound('User not found');
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

/**
 * Create new user
 */
const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);

  res.status(201).json({
    success: true,
    data: user,
  });
});

/**
 * Update user
 */
const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUser(req.params.id, req.body);

  if (!user) {
    throw ApiError.notFound('User not found');
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

/**
 * Delete user
 */
const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUser(req.params.id);

  res.status(204).send();
});

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
