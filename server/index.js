/* eslint consistent-return:0 */

const express = require('express');
const app = express();
const { resolve } = require('path');
const http = require('http').Server(app);
const io = require('socket.io')(http);

const logger = require('./util//logger');
const argv = require('./util/argv');
const port = require('./util//port');
const setup = require('./middlewares/frontendMiddleware');


// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi);

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

// Start your app.
app.listen(port, host, (err) => {
  if (err) {
    return logger.error(err.message);
  }
  logger.appStarted(port, prettyHost);
});

io.on('connection', socket => {
  console.log('User connected');
  socket.on('event', message => {
    console.log(message);
    io.emit('event', message);
  })
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});
