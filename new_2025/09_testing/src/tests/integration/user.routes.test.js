const request = require('supertest');

const app = require('../../app');
const User = require('../../models/user.model');

// Load test setup
require('../setup');

describe('User Routes', () => {
  describe('GET /api/users', () => {
    it('should return all users', async () => {
      // Arrange: Create test users
      await User.create([
        { name: 'User 1', email: 'user1@example.com', password: 'pass123' },
        { name: 'User 2', email: 'user2@example.com', password: 'pass123' },
      ]);

      // Act: Make request
      const response = await request(app).get('/api/users').expect(200);

      // Assert
      expect(response.body.success).toBe(true);
      expect(response.body.results).toBe(2);
      expect(response.body.data).toHaveLength(2);
    });

    it('should return empty array if no users', async () => {
      const response = await request(app).get('/api/users').expect(200);

      expect(response.body.data).toHaveLength(0);
    });
  });

  describe('POST /api/users', () => {
    it('should create new user', async () => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      };

      const response = await request(app).post('/api/users').send(userData).expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('_id');
      expect(response.body.data.email).toBe(userData.email);
      expect(response.body.data).not.toHaveProperty('password');
    });

    it('should return 400 if validation fails', async () => {
      const userData = {
        name: 'T', // Too short
        email: 'invalid-email',
        password: '123', // Too short
      };

      const response = await request(app).post('/api/users').send(userData).expect(400);

      expect(response.body.success).toBe(false);
    });

    it('should return 409 if email already exists', async () => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      };

      await request(app).post('/api/users').send(userData).expect(201);

      const response = await request(app).post('/api/users').send(userData).expect(409);

      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /api/users/:id', () => {
    it('should return user by id', async () => {
      const user = await User.create({
        name: 'Test User',
        email: 'test@example.com',
        password: 'hashedpassword',
      });

      const response = await request(app).get(`/api/users/${user._id}`).expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data._id).toBe(user._id.toString());
    });

    it('should return 404 if user not found', async () => {
      const fakeId = '507f1f77bcf86cd799439011';

      const response = await request(app).get(`/api/users/${fakeId}`).expect(404);

      expect(response.body.success).toBe(false);
    });

    it('should return 400 if invalid id format', async () => {
      await request(app).get('/api/users/invalid-id').expect(400);
    });
  });

  describe('PATCH /api/users/:id', () => {
    it('should update user', async () => {
      const user = await User.create({
        name: 'Test User',
        email: 'test@example.com',
        password: 'hashedpassword',
      });

      const updateData = { name: 'Updated Name' };

      const response = await request(app)
        .patch(`/api/users/${user._id}`)
        .send(updateData)
        .expect(200);

      expect(response.body.data.name).toBe(updateData.name);
    });
  });

  describe('DELETE /api/users/:id', () => {
    it('should delete user', async () => {
      const user = await User.create({
        name: 'Test User',
        email: 'test@example.com',
        password: 'hashedpassword',
      });

      await request(app).delete(`/api/users/${user._id}`).expect(204);

      const deletedUser = await User.findById(user._id);
      expect(deletedUser).toBeNull();
    });
  });
});
