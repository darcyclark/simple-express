var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('support/index', { title: 'Support Index' });
});

module.exports = router;
