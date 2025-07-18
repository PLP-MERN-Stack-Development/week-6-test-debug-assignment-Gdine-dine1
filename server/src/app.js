const express = require('express');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const User = require('./models/User');
const authRoutes = require('./routes/auth');
const auth = require('./middleware/auth');

const app = express();

app.use(express.json());
app.use(logger);

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello, world!' });
});

// Error route for testing
app.get('/api/error', (req, res) => {
  throw new Error('Test error');
});

app.post('/api/users', async (req, res, next) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
});

app.use('/api/auth', authRoutes);

app.get('/api/protected', auth, (req, res) => {
  res.json({ message: `Hello user ${req.user.userId}` });
});

app.use(errorHandler);

module.exports = app; 