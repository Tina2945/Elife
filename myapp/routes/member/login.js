var express = require('express');
var router = express.Router();
var Member = require('../../models/Member');
var crypto = require('crypto');

router.get('/', function(req, res, next) {
    res.render('member/login');
});

router.post('/', function(req, res, next) {
    Member.check(req.body.account, function(err, member) {
        if (err) {
            res.render('login_error', {
                error: '帳號錯誤',
                link: 'login'
            });
        } else {
            var md5 = crypto.createHash('md5');
            var password = md5.update(req.body.password).digest('hex');

            if (password != member.password) {
                res.render('login_error', {
                    error: '密碼錯誤',
                    link: 'login'
                });
            } else {
                req.session.member = member;
                res.redirect('/home');
            }
        }
    });
});

module.exports = router;
