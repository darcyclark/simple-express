var express = require('express');
var router = express.Router();

router.use(function(req, res, next) {
  // ** note the following gets added to other route middlewares too
  res.locals.path = req.path.split("/")[1]
  next();
});

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Home' });
});

router.get('/about', function(req, res) {
  res.render('about', { title: 'About page' });
});

module.exports = router;
