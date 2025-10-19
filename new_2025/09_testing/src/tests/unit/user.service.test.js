const User = require('../../models/user.model.js');
const userService = require('../../services/user.service.js');
const ApiError = require('../../utils/ApiError.js');

// Load test setup
require('../setup');

describe('UserService', () => {
  describe('createUser', () => {
    it('should create user successfully', async () => {
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      };

      const user = await userService.createUser(userData);

      expect(user).toBeDefined();
      expect(user._id).toBeDefined();
      expect(user.name).toBe(userData.name);
      expect(user.email).toBe(userData.email);
      expect(user.password).not.toBe(userData.password); // Should be hashed
    });

    it('should throw error if email already exists', async () => {
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      };

      await userService.createUser(userData);

      await expect(userService.createUser(userData)).rejects.toThrow(ApiError);
    });

    it('should throw error if required fields are missing', async () => {
      const userData = {
        name: 'John Doe',
        // email missing
        password: 'password123',
      };

      await expect(userService.createUser(userData)).rejects.toThrow();
    });
  });

  describe('getUserById', () => {
    it('should return user if exists', async () => {
      const createdUser = await User.create({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'hashedpassword',
      });

      const user = await userService.getUserById(createdUser._id);

      expect(user).toBeDefined();
      expect(user._id.toString()).toBe(createdUser._id.toString());
    });

    it('should return null if user does not exist', async () => {
      const fakeId = '507f1f77bcf86cd799439011';
      const user = await userService.getUserById(fakeId);

      expect(user).toBeNull();
    });
  });

  describe('updateUser', () => {
    it('should update user successfully', async () => {
      const createdUser = await User.create({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'hashedpassword',
      });

      const updateData = { name: 'Jane Doe' };
      const updatedUser = await userService.updateUser(createdUser._id, updateData);

      expect(updatedUser.name).toBe(updateData.name);
    });
  });

  describe('deleteUser', () => {
    it('should delete user successfully', async () => {
      const createdUser = await User.create({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'hashedpassword',
      });

      await userService.deleteUser(createdUser._id);

      const user = await User.findById(createdUser._id);
      expect(user).toBeNull();
    });
  });
});
