/* eslint consistent-return:0 */
require('dotenv').config()

const { resolve } = require('path');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const dbConnection = require('./database');
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
http.listen(port, host, (err) => {
  if (err) {
    return logger.error(err.message);
  }
  logger.appStarted(port, prettyHost);
});

io.on('connection', (socket) => {
  console.log('socket io user connected');
  socket.on('event', (msg) => {
    console.log(msg);
    io.emit('event', msg);
  });
  socket.on('disconnect', () => {
    console.log('socket io user disconnected');
  });
});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(session({
  secret: 'fraggle-rock', // pick a random string to make the hash that is generated secure
  store: new MongoStore({mongooseConnection: dbConnection}),
  resave: false, // required
  saveUninitialized: false, // required
}));
