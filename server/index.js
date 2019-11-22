const express = require('express');
const { resolve } = require('path');
const compression = require('compression');
const cors = require('cors');

const logger = require('./util/logger');
const setupMiddleware = require('./middlewares/frontendMiddleware');

const app = express();

app.use(cors({
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ['x-auth-token']
}));
app.disable('x-powered-by');
app.use(compression());
// server configuration
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('X-Content-Type-Options', 'no sniff');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.set('Cache-Control', 'public, max-age=31557600');

  next();
});

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
