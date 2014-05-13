var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.render('support/index', { title: 'Contact Us' });
  //res.send('respond with a resource');
});

module.exports = router;
