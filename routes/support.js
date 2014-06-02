var express = require('express');
var router = express.Router();
var yaml = require('front-matter');
var Finder = require('fs-finder');
var fs = require('fs');

// build array of page data and add to req
router.use(function(req, res, next) {

  var getFiles = function(dir) {
    filelist = new Array();
    var files = Finder.in(dir).exclude(['index.jade']).findFiles('*.jade');
    files.forEach( function(file) {
      var out = yaml(fs.readFileSync(file, 'utf-8'));
      // filter 
      if (out.attributes.draft == false) { 
        // strip off path and .extension
        filename = file.substring(file.lastIndexOf('/')+1)
        filename = filename.substring(0, filename.lastIndexOf('.'))
        // add metadata
        filelist.push([ filename, out.attributes.title, out.attributes.date ]);
      };
    });
    var column = 2; // sort by date
    sorted = filelist.sort(function(x,y) { return x[column] < y[column] });
    return sorted;
  };

  req.pages = getFiles("./views/support/pages/");
  next();
});

router.get('/', function(req, res) {
  res.render('support/index', { pages:req.pages, title: 'Support Index' });
});

router.get('/pages/:slug', function(req, res) {
  res.render('support/pages/' + req.params.slug, { layout: 'layout', pages: req.pages });
})

module.exports = router;
