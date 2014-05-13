var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Simple-Express site template' });
});

router.get('/about', function(req, res) {
  res.render('about', { title: 'About page' });
});

module.exports = router;
