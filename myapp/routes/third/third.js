var express = require('express');
var router = express.Router();
var Third = require('../../models/thirdm');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('third', {
    member : null
  });
});
router.post('/', function(req, res, next) {

  //首先必須先產生出一個Member的物件在進行save
  var newThird = new Third({
    account : req.body.account,
    password : req.body.password,
    name : req.body.name,
    phonenum : req.body.phonenum,
    bankaccount : req.body.bankaccount
  });
  newThird.save(function(err) {
    if(err) {
      next(err);
    } else {
      //再重新導向之前，我們要讓使用者登入，因此我們需要使用到session
      req.session.third = newThird;
      res.redirect('/');

    }
  });
});

/* Log  Out*/
router.post('/logout', function(req, res, next) {
  req.session.third = null;
  res.redirect('/');
});


module.exports = router;
