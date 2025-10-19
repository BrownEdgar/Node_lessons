class UserController {
  async getAllUsers(req, res) {
    try {
      const users = await req.app.services.users.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({
        status: 'fail',
        message: error.message,
      });
    }
  }
}

module.exports = UserController;
