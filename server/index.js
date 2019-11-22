const express = require('express');
const { resolve } = require('path');
const compression = require('compression');

const logger = require('./util/logger');
const setupMiddleware = require('./middlewares/frontendMiddleware');

const app = express();

// server configuration
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('X-Content-Type-Options', 'no sniff');
  res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Authorization, Content-Length, X-Requested-With, Accept');
  res.set('Cache-Control', 'public, max-age=31557600');

  // intercept OPTIONS method
  if (req.method === 'OPTIONS') {
    res.send(200);
  } else {
    next();
  }
});
app.disable('x-powered-by');
app.use(compression());

const port = process.env.PORT || 8081;

// In production we need to pass these values in instead of relying on webpack
setupMiddleware(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/'
});

logger.info(`Trying to host at port: ${port}`);

// Start your app.
app.listen(port, (err) => {
  if (err) {
    return logger.error(err.message);
  }
  logger.success(`Hosted successfully at port: ${port}`);
});
