var express = require('express');
var router = express.Router();
var md = require('marked');
var yaml = require('front-matter');
var fs = require('fs');
var lunr = require('lunr');
var _ = require('underscore');
_.str = require('underscore.string');
var getPages = require('../helpers/getPages.js');
    
// response middleware - augments other routes below

router.use(function(req, res, next) {
  content = {}
  content.pages = getPages("./views/blog/pages/");
  // leave out drafts and sort by date
  published = _.filter(content.pages, function(page) {
    return page.publish;
  });
  res.locals.tags = _.uniq(_.flatten(_.pluck(published, "tags"))).sort();
  res.locals.pages = _.sortBy(published, "date").reverse();
  next();
});

// blog index

router.get('/', function(req, res) {
  res.render('blog/index', { title: 'Blog Index' });
});

// search by tag

router.get('/tags/:tag', function(req, res) {
  tagged = _.filter(content.pages, function(page) {
    return page.tags.indexOf(req.params.tag) != -1;
  });
  res.locals.tag_active = req.params.tag;
  res.locals.pages = _.sortBy(_.intersection(tagged, published), "date").reverse();
  res.render('blog/index', { title: 'Blog: ' + _.str.capitalize(req.params.tag) });
});

// page views

router.get('/pages/:slug', function(req, res) {
  page = './views/blog/pages/' + req.params.slug
  contents = yaml(fs.readFileSync(page + '.md', 'utf-8')); 
  res.render('blog/page', {page: contents.attributes, body: md(contents.body), title: contents.attributes.title })
})

// full-text search

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
  res.render('blog/index', { title: 'Blog Search', searchterm: req.body.searchterm});
});

module.exports = router;
