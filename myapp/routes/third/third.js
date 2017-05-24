var express = require('express');
var router = express.Router();
var Third = require('../../models/Third');
var crypto = require('crypto');

router.get('/', function(req, res, next) {
    res.render('third/third');
});

router.post('/', function(req, res, next) {
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('hex');

    var newThird = new Third({
        name: req.body.name,
        phonenum: req.body.phonenum,
        account: req.body.account,
        password: password
    });

    newThird.save(function(err) {
        if (err) {
            next(err);
        } else {
            req.session.third = newThird;
            res.redirect('/thirdlogin');
        }
    });
});

router.post('/logout', function(req, res, next) {
    req.session.third = null;
    res.redirect('/');
});

module.exports = router;
