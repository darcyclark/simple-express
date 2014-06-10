var express = require('express');
var router = express.Router();
var md = require('marked');
var yaml = require('front-matter');
var fs = require('fs');
var jsonpath = require('JSONPath');
var lunr = require('lunr');
var _ = require('underscore');
_.str = require('underscore.string');
var utils = require('../helpers/utils.js');
var getFiles = require('../helpers/getFiles.js');
    
// response middleware - augments other routes below

router.use(function(req, res, next) {
  content = {}
  content.pages = getFiles("./views/blog/pages/");
  // leave out drafts and sort by date
  published = jsonpath.eval(content, "$.pages[?(@.publish)]");
  res.locals.tags = _.uniq(_.flatten(jsonpath.eval(published, "$..tags"))).sort();
  res.locals.pages = utils.sortByKey(published, "date");
  next();
});

// blog index

router.get('/', function(req, res) {
  res.render('blog/index', { title: 'Blog Index' });
});

// list by tag

router.get('/tags/:tag', function(req, res) {
  query = "$.pages[?(@.tags.indexOf('" + req.params.tag + "') != -1)]";
  tagged = jsonpath.eval(content, query);
  res.locals.pages = utils.sortByKey(_.intersection(tagged, published), "date");
  res.render('blog/index', { title: 'Blog Index' });
});

// page views

router.get('/pages/:slug', function(req, res) {
  page = './views/blog/pages/' + req.params.slug
  contents = yaml(fs.readFileSync(page + '.md', 'utf-8')); 
  res.render('blog/layout', {page: contents.attributes, body: md(contents.body) })
})

// search

router.post('/search', function(req, res) {
  // create index
  var idx = lunr(function () {
      this.field('title', { boost: 100 });
      this.field('tags', { boost: 10 });
      this.field('content');
      this.ref('filename');
  });
  // index pages
  published.forEach( function(page) {
    idx.add(page);
  });
  // search pages
  res.locals.pages = idx.search(req.body.searchterm).map( function (result) {
    return content.pages.filter(function (q) { return q.filename === result.ref })[0]
  });
  res.render('blog/index', { title: 'Blog Index' });
});

module.exports = router;
