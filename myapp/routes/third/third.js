var express = require('express');
var router = express.Router();
var Third = require('../../models/thirdm');

router.get('/', function(req, res, next) {
  res.render('third/third');
});

router.post('/', function(req, res, next) {
  var newThird = new Third({
    account : req.body.account,
    password : req.body.password,
    name : req.body.name,
    phonenum : req.body.phonenum   
  });

  newThird.save(function(err) {
    if(err) {
      next(err);
    } else {
      req.session.third = newThird;
      res.redirect('/third_login');
    }
  });
});

/* Log  Out*/
router.post('/logout', function(req, res, next) {
  req.session.third = null;
  res.redirect('/');
});


module.exports = router;
