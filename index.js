const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
require('./server/db.js');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static('./dist'));
app.use(require('./server/controllers'));

app.listen(3004,function(){
	console.log('express server listening on port: ',this.address().port);
});
