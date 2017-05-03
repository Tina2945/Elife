var express = require('express');
var router = express.Router();
var SupplierMember = require('../../models/SupplierMember');
var crypto = require('crypto');

router.get('/', function(req, res, next) {
    res.render('supplier/supplierlogin');
});

router.post('/', function(req, res, next) {
    SupplierMember.check(req.body.account, function(err, supplierm) {
        var md5 = crypto.createHash('md5');
        var password = md5.update(req.body.password).digest('hex');

        if (password != supplierm.password) {
            res.redirect('/supplierlogin_error');
        } else {
            req.session.supplierm = supplierm;
            res.redirect('/product');
        }
    });
});

module.exports = router;
