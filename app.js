var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var textile = require('textile-js'); 
var semiStatic = require('semi-static');

var app = express();
var port = Number(process.env.PORT || 5000);
var server = http.createServer(app).listen(port);
console.log("Listening on " + port);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// add Textile as a filter - as an alternative to Markdown
var filters = require('jade').filters
filters.textile = function(params){
  return textile(params);
}

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

// static content - managed by Docpad
app.use(express.static(path.join(__dirname, 'public')));

// dynamic content - conventional Express routes and views
var routes = require('./routes/dynamic');
app.use('/', routes);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
