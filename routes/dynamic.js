var express = require('express');
var router = express.Router();
var _ = require('underscore');
_.str = require('underscore.string');
_.mixin(_.str.exports());

// dynamic (non-static) routes go here - for pages that require interactivity, forms and the like

router.post('/contact', function(req, res) {
  res.send('Hi ' + _.capitalize(req.body.field) + ', will you be my friend?');
  //res.redirect('contact.html')
});

module.exports = router;
