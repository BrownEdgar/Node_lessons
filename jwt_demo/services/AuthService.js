class AuthService {
  constructor(models) {
    this.models = models;
  }

  async signUp(body) {
    const user = await new this.models.users({ ...body })
    await user.save()
    return user;
  }
}

module.exports = AuthService;