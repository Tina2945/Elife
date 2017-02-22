var express = require('express');
var router = express.Router();
var SupplierMember = require('../../models/supplierm');

var async = require('async');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('supplier', {
    member : null
  });
});
router.post('/', function(req, res, next) {

  //首先必須先產生出一個Member的物件在進行save
  var newSupplierMember = new SupplierMember({
    account : req.body.account,
    password : req.body.password,
    name : req.body.name,
    phonenum : req.body.phonenum,
    address : req.body.address,
    photo : req.body.photo
  });
  newSupplierMember.save(function(err) {
    if(err) {
      next(err);
    } else {
      //再重新導向之前，我們要讓使用者登入，因此我們需要使用到session
      req.session.supplierm = newSupplierMember;
      res.redirect('/');

    }
  });
});

/* Log  Out*/
router.post('/logout', function(req, res, next) {
  req.session.supplierm = null;
  res.redirect('/');
});


module.exports = router;
