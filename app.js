// DEPENDENCIES
const cors = require('cors');
const express = require('express');

const authController = require('./controllers/authController');
const clothesController = require('./controllers/clothesController');
const locationsController = require('./controllers/locationsController');
const typeController = require('./controllers/typeController');

// CONFIGURATION
const app = express();

// MIDDLEWARE
app.use(cors());

app.use((req, _res, next) => {
  console.log('Origin Requested:', req.headers.origin);
  next();
});

app.use(express.json());

app.use('/api/auth', authController);
app.use('/api/clothes', clothesController);
app.use('/api/locations', locationsController);
app.use('/api/types', typeController);

// ROUTES
app.get('/', (_req, res) => {
  res.send('Welcome to Firebase Backend Server');
});

// 404 PAGE
app.get('*', (_req, res) => {
  res.status(404).send('Page not found');
});

// EXPORT
module.exports = app;
