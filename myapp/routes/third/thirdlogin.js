var express = require('express');
var router = express.Router();
var Third = require('../../models/Third');
var crypto = require('crypto');

router.get('/', function(req, res, next) {
    res.render('third/thirdlogin');
});

router.post('/', function(req, res, next) {
    Third.check(req.body.account, function(err, third) {
        var md5 = crypto.createHash('md5');
        var password = md5.update(req.body.password).digest('hex');

        if (password != third.password) {
            res.redirect('/thirdlogin_error');
        } else {
            req.session.third = third;
            res.redirect('/third_order');
        }
    });
});

module.exports = router;
