var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/gumps', function(req, res) {
  res.render('gump', { title: 'Gump' });
});

module.exports = router;
