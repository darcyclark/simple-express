var express = require('express');
var router = express.Router();

router.use(function(req, res, next) {
  next();
});

/* contact form */
router.get('/', function(req, res) {
  res.locals.form_vars = req.body;
  res.render('contact', { title: 'Contact Us' });
});

/* contact form processing */
router.post('/send', function(req, res) {
  // validations
  req.assert('name', 'Name is required').notEmpty();
  req.assert('email', 'A valid email is required').isEmail();
  var errors = req.validationErrors();
  // no form errors?
  if (!errors) {
    res.locals.form_vars = [];
    var mailOptions = {
      from: req.body.name + "\u003C" + req.body.email + "\u003E",
      to: "darcy@qualitysystems.com",
      subject: "Inquiry",
      text: req.body.message
      // TODO: nodemailer templates?
    }
    // send email
    transport.sendMail(mailOptions, function(error, response){
      if (error) {
        console.log(error);
      } else {
        console.log("Message sent: " + response.message);
      }
      transport.close();
      res.render('contact', {
        message: 'Message sent!',
      });
    });
  } else {
    // have errors ? show form with errors
    res.locals.form_vars = req.body;
    res.render('contact', {
      errors: errors
    });
  }

});

module.exports = router;
