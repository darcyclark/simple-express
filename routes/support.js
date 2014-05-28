var express = require('express');
var router = express.Router();
var dir = require('node-dir');
var fm = require('front-matter');
var jfm = require('json-front-matter');

router.get('/', function(req, res) {
  data = new Array();
  dir.readFiles("./views/support/pages", {
    match: /.jade/,
    shortName: true
  }, 
  function(err, content, filename, next) {
    var out = fm( content );
    if (out.attributes.draft == true) { 
      f = filename.substring(0, filename.lastIndexOf('.'))
      data.push([ f, out.attributes.title, out.attributes.date ]);
    };
    next();
  },
  function(err, files){
    if (err) throw err;
    var column = 2; // sort by date
    sorted = data.sort(function(x,y) { return x[column] < y[column] });
    res.render('support/index', { data:sorted, title: 'Support Index' });
  });
});

module.exports = router;
