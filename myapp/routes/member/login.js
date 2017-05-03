var express = require('express');
var router = express.Router();
var Member = require('../../models/Member');
var crypto = require('crypto');

router.get('/', function(req, res, next) {
    res.render('member/login');
});

router.post('/', function(req, res, next) {
    Member.check(req.body.account, function(err, member) {
        var md5 = crypto.createHash('md5');
        var password = md5.update(req.body.password).digest('hex');

        if (password != member.password) {
            res.redirect('/login_error');
        } else {
            req.session.member = member;
            res.redirect('/home');
        }
    });
});

router.post('/logout', function(req, res, next) {
    req.session.member = null;
    res.redirect('/');
});

module.exports = router;
