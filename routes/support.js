var express = require('express');
var router = express.Router();
var md = require('marked');
var yaml = require('front-matter');
var fs = require('fs');
var jsonpath = require('JSONPath');
var utils = require('../helpers/utils.js');
var getFiles = require('../helpers/getFiles.js');
var lunr = require('lunr');
    
// response middleware - augments other routes below

router.use(function(req, res, next) {
  content = {}
  content.pages = getFiles("./views/support/pages/");
  // leave out drafts and sort by date
  published = jsonpath.eval(content, "$.pages[?(@.publish)]");
  res.locals.pages = utils.sortByKey(published, "date");
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

// search

router.post('/search', function(req, res) {
  // build index
  var idx = lunr(function () {
      this.field('title', { boost: 10 });
      this.field('content', { boost: 100 });
      this.ref('filename');
  });
  published.forEach( function(page) {
    idx.add(page);
  });
  // search pages
  res.locals.pages = idx.search(req.body.searchterm).map( function (result) {
    return content.pages.filter(function (q) { return q.filename === result.ref })[0]
  });
  res.render('support/index', { title: 'Support Index' });
});

module.exports = router;
