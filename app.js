const http = require('http');
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const serveStatic = require('serve-static');

mongoose.connect('mongodb://localhost/full_stack_coding_exercise');

const app = express();
const server = http.createServer(app);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(serveStatic(path.join(__dirname, 'public')));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const index = require('./routes/index');
const v1Flags = require('./routes/api/v1/flags');

app.use('/', index);
app.use('/api/v1/flags', v1Flags);

app.use((req, res) => {
  res.status(404);
  res.json({
    statusCode: 404,
    message: 'Route not found'
  });
});

server.listen(3001, () => {
  const address = server.address();

  console.log(`Server listening on port ${address.port}. Go to http://localhost:${address.port}/`);
});

server.on('error', (err) => {
  console.log(err);
});
