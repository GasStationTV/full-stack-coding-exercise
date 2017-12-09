const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// config files
var db = require('./config/db');

// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

// Setup logger
app.use(
  morgan(
    ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'
  )
);

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

// Set up the API route
require('./services/crud')(app);

// Set up the app route
require('./route')(app, path);

// Connect to mongo DB
mongoose.connect(db.url, { config: { autoIndex: false } });

var database = mongoose.connection;
database.on('error', console.error.bind(console, 'connection error:'));
database.once('open', function() {
  console.log('Connect to DB at ' + db.url + ' successfully.');
});

module.exports = app;
