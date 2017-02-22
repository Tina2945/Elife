var express = require('express');
var router = express.Router();
var Third = require('../../models/thirdm');

var async = require('async');
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('thirdlogin', {
        member: null
    });
});


router.post('/', function(req, res, next) {
    Third.check(req.body.account, function(err, third) {
        if (req.body.password != member.password) {
            res.send('Your password is incorrect!');
        } else {
            req.session.third = third;
            res.redirect('/');
        }
    });
});

router.post('/logout', function(req, res, next) {
    req.session.third = null;
    res.redirect('/');
});


module.exports = router;
