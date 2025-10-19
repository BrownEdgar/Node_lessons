require('./config/passport-setup');
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');

const keys = require('./config/keys');
const authRouter = require('./routes/auth-routes');

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');

// MongoDB connection
mongoose
  .connect(keys.mongodb.dbURI, {
    dbName: 'google-oauth-tutorial',
  })
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware
app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.render('home', { user: req.user });
});

app.use('/auth', authRouter);

// Error handling middleware
app.use((err, _req, res) => {
  console.error('Error:', err);
  res.status(500).render('error', {
    error: process.env.NODE_ENV === 'production' ? 'Something went wrong!' : err.message,
  });
});

// 404 handler
app.use((_req, res) => {
  res.status(404).render('error', {
    error: 'Page not found',
  });
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
