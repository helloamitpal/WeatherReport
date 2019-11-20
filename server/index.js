const express = require('express');
const { resolve } = require('path');

const logger = require('./util/logger');
const setupMiddleware = require('./middlewares/frontendMiddleware');

const app = express();

// server configuration
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('X-Content-Type-Options', 'no sniff');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.set('Cache-Control', 'public, max-age=31557600');

  next();
});

const port = parseInt(process.env.PORT || '8081', 10);
const host = process.env.HOST || 'localhost';

// In production we need to pass these values in instead of relying on webpack
setupMiddleware(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/'
});

// Start your app.
app.listen(port, host, (err) => {
  if (err) {
    return logger.error(err.message);
  }
});
