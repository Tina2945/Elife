var express = require('express');
var router = express.Router();
var SupplierMember = require('../../models/SupplierMember');
var District = require('../../models/District');

router.get('/', function(req, res, next) {
    District.get(function(err, district) {
        res.render('supplier/supplier', {
            district: district
        });
    });
});

router.post('/', function(req, res, next) {
    var newSupplierMember = new SupplierMember({
        storeName: req.body.storeName,
        name: req.body.name,
        phonenum: req.body.phonenum,
        city: req.body.city,
        hometown: req.body.hometown,
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
