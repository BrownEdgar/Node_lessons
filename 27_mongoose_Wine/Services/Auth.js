const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class AuthController {
  constructor(models) {
    this.models = models;
  }
  // ------------------------------------------
  async register(res, body) {
    try {
      const { email, password } = body;
      const checkUser = await this.models.user.findOne({ email });
      if (checkUser) {
        res.status(400).json({ message: "this email alredy exist!" });
      }
      const hashPassword = await bcrypt.hash(password, 10);
      console.log('hashPassword', hashPassword)
      const newUser = new this.models.user({
        email,
        password: hashPassword
      })
      await newUser.save();
      res.status(201).json({ newUser });
    }
    catch (err) {
      res.status(500).send(err);
    }

  }
  // ------------------------------------------

  // ------------------------------------------
  async login(res, body) {
    const { email, password } = body;

    try {
      const user = await this.models.user.findOne({ email })

      if (!user) {
        res.status(404).send("user not Found");

      } else {
        const hashPassword = bcrypt.compareSync(password, user.password);
        if (!hashPassword) {
          res.status(401).send("invalid password");
          res.end()
        }
        const token = generateAccessToken({ email }, process.env.SESSION_SECRET)

        res.status(201).json({ token });
      }
    }
    catch (err) {
      console.log(err);
      return { err }
    }


  }

}
function generateAccessToken(payload, secret) {
  return jwt.sign(payload, secret, { expiresIn: "15s" })
}

module.exports = AuthController;