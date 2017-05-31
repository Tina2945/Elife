var express = require('express');
var router = express.Router();
var SupplierMember = require('../../models/SupplierMember');
var crypto = require('crypto');

router.get('/', function(req, res, next) {
    res.render('supplier/supplierlogin');
});

router.post('/', function(req, res, next) {
    SupplierMember.check(req.body.account, function(err, supplierm) {
        if (err) {
            res.render('login_error', {
                error: '帳號錯誤',
                link: 'supplierlogin'
            });
        } else {
            var md5 = crypto.createHash('md5');
            var password = md5.update(req.body.password).digest('hex');

            if (password != supplierm.password) {
                res.render('login_error', {
                    error: '密碼錯誤',
                    link: 'supplierlogin'
                });
            } else {
                req.session.supplierm = supplierm;
                res.redirect('/product');
            }
        }
    });
});

module.exports = router;
