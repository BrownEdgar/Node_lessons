class UserController {
  async testMethods(req, res) {
    try {
      const result = await req.app.services.users.testMethods();
      res.status(200).send(result);
    } catch (error) {
      console.log('error', error)
      res.status(500).send(err.message);
    }
  }

  async addUsers(req, res) {
    try {
      const result = await req.app.services.users.addUsers();
      res.status(200).send(result);
    } catch (error) {
      console.log('error', error)
      res.status(500).send(error.message);
    }
  }
}

module.exports = UserController