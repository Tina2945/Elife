var express = require('express');
var router = express.Router();
var Member = require('../../models/Member');

router.get('/', function(req, res, next) {
    res.render('member/login', {
        member: null
    });
});

router.post('/', function(req, res, next) {
    Member.check(req.body.account, function(err, member) {
        if (req.body.password != member.password) {
            res.send('Your password is incorrect!');
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
