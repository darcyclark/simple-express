var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/page', function(req, res) {
  res.render('page.textile', { title: 'Express' });
});

module.exports = router;
