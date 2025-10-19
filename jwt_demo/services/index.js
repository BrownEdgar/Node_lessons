const AuthService = require('./AuthService');
const UserService = require('./UserService');

module.exports = {
  users: UserService,
  auth: AuthService,
};
