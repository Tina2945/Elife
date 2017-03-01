var express = require('express');
var router = express.Router();
var SupplierMember = require('../../models/supplierm');

router.get('/', function(req, res, next) {
    res.render('supplierlogin', {
        member: null
    });
});

router.post('/', function(req, res, next) {
    SupplierMember.check(req.body.account, function(err, supplierm) {
        if (req.body.password != supplierm.password) {
            res.send('Your password is incorrect!');
        } else {
            req.session.supplierm = supplierm;
            res.redirect('/product');
        }
    });
});

router.post('/logout', function(req, res, next) {
    req.session.supplierm = null;
    res.redirect('/');
});

module.exports = router;
