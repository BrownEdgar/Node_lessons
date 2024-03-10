const jwt = require('jsonwebtoken');

// middleWare 
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  console.log({ token: process.env.ACCESS_TOKEN_SECRET, token2: authHeader })
  if (token == null) return res.sendStatus(401)
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    console.log(err)
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}

module.exports = authenticateToken;