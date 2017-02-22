var express = require('express');
var router = express.Router();
var Member = require('../../models/Member');

var async = require('async');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('register', {
    member : null
  });
});
router.post('/', function(req, res, next) {

  //首先必須先產生出一個Member的物件在進行save
  var newMember = new Member({
    account : req.body.account,
    password : req.body.password,
    name : req.body.name,
    phonenum : req.body.phonenum,
    address : req.body.address
  });
  newMember.save(function(err) {
    if(err) {
      next(err);
    } else {
      //再重新導向之前，我們要讓使用者登入，因此我們需要使用到session
      req.session.member = newMember;
      res.redirect('/login');

    }
  });
});

/* Log  Out*/
router.post('/logout', function(req, res, next) {
  req.session.member = null;
  res.redirect('/');
});


module.exports = router;
