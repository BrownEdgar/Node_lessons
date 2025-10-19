const jwt = require('jsonwebtoken');

class AuthController {
  constructor(services) {
    this.services = services;
  }

  signIn(req, res) {
    try {
      res.status(200).json('ok');
    } catch (error) {
      res.status(500).json({
        status: 'fail',
        message: error.message,
      });
    }
  }

  async signUp(req, res) {
    const { body } = req;
    try {
      const user = await req.app.services.auth.signUp(body);
      if (user) {
        const token = jwt.sign({ email: user.email }, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: '4m',
        });
        res.json({ token });
      }
    } catch (error) {
      console.log('error', error);
      res.status(500).json({
        status: 'fail',
        message: error.message,
      });
    }
  }
}

module.exports = AuthController;
