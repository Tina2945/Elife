var express = require('express');
var router = express.Router();
var SupplierMember = require('../../models/SupplierMember');

router.get('/', function(req, res, next) {
    res.render('supplier/supplier', {
        member: null
    });
});

router.post('/', function(req, res, next) {
    var newSupplierMember = new SupplierMember({
        storeName: req.body.storeName,
        name: req.body.name,
        phonenum: req.body.phonenum,
        address: req.body.address,
        //photo : req.body.photo,
        account: req.body.account,
        password: req.body.password
    });

    newSupplierMember.save(function(err) {
        if (err) {
            next(err);
        } else {
            req.session.supplierm = newSupplierMember;
            res.redirect('/supplierlogin');
        }
    });
});

router.post('/logout', function(req, res, next) {
    req.session.supplierm = null;
    res.redirect('/');
});

module.exports = router;
