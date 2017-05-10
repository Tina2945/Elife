var express = require('express');
var router = express.Router();
var Third = require('../../models/thirdm');

router.get('/', function(req, res, next) {
    res.render('third/thirdlogin');
});

router.post('/', function(req, res, next) {
    Third.check(req.body.account, function(err, third) {
        if (req.body.password != third.password) {
            res.send('Your password is incorrect!');
        } else {
            req.session.third = third;
            res.redirect('/third_order');
        }
    });
});

router.post('/logout', function(req, res, next) {
    req.session.third = null;
    res.redirect('/');
});

module.exports = router;
