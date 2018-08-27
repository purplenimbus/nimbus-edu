var gzippo = require('gzippo');
var express = require('express');
//var logger = require('morgan');

//console.log(logger);
//console.log(logger('dev'));

var app = express();

//app.use(logger('dev'));
app.use(gzippo.staticGzip("" + __dirname + "/dist"));
app.listen(process.env.PORT || 5000);