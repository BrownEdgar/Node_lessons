class UserService {
  constructor(models) {
    this.models = models;
  }
  async getAllUsers() {
    const users = await this.models.users.find({}, { password: 0 })
    return users
  }
}

module.exports = UserService