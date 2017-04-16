var express = require('express');
var router = express.Router();
var SupplierMember = require('../../models/SupplierMember');

router.get('/', function(req, res, next) {
    res.render('supplier/supplierlogin');
});

router.post('/', function(req, res, next) {
    SupplierMember.check(req.body.account, function(err, supplierm) {
        if (req.body.password != supplierm.password) {
            //res.send('Your password is incorrect!');
            console.log('Your password is incorrect!')
            res.redirect('/supplierlogin');
        } else {
            req.session.supplierm = supplierm;
            res.redirect('/product');
        }
    });
});

module.exports = router;
