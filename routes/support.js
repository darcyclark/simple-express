var express = require('express');
var router = express.Router();
var yaml = require('front-matter');
var Finder = require('fs-finder');
var fs = require('fs');
var md = require('marked');

// response middleware
router.use(function(req, res, next) {
  var getPages = function() {
    pagearray = new Array();
    dir = "./views/support/pages/"
    var pages = Finder.in(dir).findFiles('*.md');
    pages.forEach( function(page) {
      var out = yaml(fs.readFileSync(page, 'utf-8'));
      // filter 
      if (out.attributes.draft == false) { 
        // strip off path and .extension
        pagename = page.substring(page.lastIndexOf('/')+1)
        pagename = pagename.substring(0, pagename.lastIndexOf('.'))
        // add metadata
        pagearray.push([ pagename, out.attributes.title, out.attributes.date ]);
      };
    });
    var column = 2; // sort by date
    return pagearray.sort(function(x,y) { return x[column] < y[column] });
  };
  res.locals.pages = getPages();
  next();
});

// support index
router.get('/', function(req, res) {
  res.render('support/index', { title: 'Support Index' });
});

// page views
router.get('/pages/:slug', function(req, res) {
  page = './views/support/pages/' + req.params.slug
  contents = yaml(fs.readFileSync(page + '.md', 'utf-8')); 
  res.render('support/layout', {title: contents.attributes.title, body: md(contents.body) })
})

module.exports = router;
