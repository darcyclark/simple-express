var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var textile = require('textile-js'); 
var mailer = require('nodemailer'); 

var app = express();

// globals
brand = 'Simple Express Template';
description = 'Express Boilerplate for simple sites with content';
// mailer
transport = mailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "replace@gmail.com",
        pass: "replace!"
    }
});
//strftime = require('strftime');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// add Textile as a filter
var filters = require('jade').filters
filters.textile = function(params){
  return textile(params);
}

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routes
var routes = require('./routes/');
var support = require('./routes/support');
var contact = require('./routes/contact');
app.use('/', routes);
app.use('/support', support);
app.use('/contact', contact);

/// error handlers

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

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

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});
module.exports = app;
