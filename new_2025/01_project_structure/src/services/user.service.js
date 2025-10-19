const User = require('../models/user.model');
const ApiError = require('../utils/ApiError');

/**
 * Get users with filtering, sorting, pagination
 */
const getUsers = async (queryParams) => {
  const { page = 1, limit = 10, sort = '-createdAt', ...filters } = queryParams;

  const skip = (page - 1) * limit;

  const users = await User.find(filters).sort(sort).limit(limit).skip(skip).select('-password'); // Exclude password

  return users;
};

/**
 * Get user by ID
 */
const getUserById = async (userId) => {
  const user = await User.findById(userId).select('-password');
  return user;
};

/**
 * Get user by email
 */
const getUserByEmail = async (email) => {
  const user = await User.findOne({ email });
  return user;
};

/**
 * Create new user
 */
const createUser = async (userData) => {
  // Check if email already exists
  const existingUser = await getUserByEmail(userData.email);
  if (existingUser) {
    throw ApiError.conflict('Email already exists');
  }

  const user = await User.create(userData);

  // Remove password from response
  user.password = undefined;

  return user;
};

/**
 * Update user
 */
const updateUser = async (userId, updateData) => {
  const user = await User.findById(userId);

  if (!user) {
    return null;
  }

  // Don't allow email update to existing email
  if (updateData.email && updateData.email !== user.email) {
    const existingUser = await getUserByEmail(updateData.email);
    if (existingUser) {
      throw ApiError.conflict('Email already exists');
    }
  }

  Object.assign(user, updateData);
  await user.save();

  user.password = undefined;
  return user;
};

/**
 * Delete user
 */
const deleteUser = async (userId) => {
  const user = await User.findByIdAndDelete(userId);

  if (!user) {
    throw ApiError.notFound('User not found');
  }

  return user;
};

module.exports = {
  getUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
};
