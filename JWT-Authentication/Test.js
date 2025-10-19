require('dotenv').config();

const express = require('express');

const app = express();
const jwt = require('jsonwebtoken');

app.use(express.json());
const refreshTokens = [];
const posts = [
  {
    username: 'Karen',
    title: 'Post 1',
  },
  {
    username: 'Levon',
    title: 'Post 2',
  },
];
app.get('/posts', authenticateToken, (req, res) => {
  res.json(posts.filter((post) => post.username === req.user.name));
});

app.post('/login', (req, res) => {
  const { username } = req.body;
  const user = { name: username };

  const accessToken = generateAccessToken(user);
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
  refreshTokens.push(refreshToken);
  res.json({ accessToken, refreshToken });
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    console.log(err);
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
}
function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '25s' });
}

app.listen(3000);
