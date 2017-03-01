var express = require('express');
var router = express.Router();
var Member = require('../../models/Member');

router.get('/', function(req, res, next) {
    res.render('register', {
        member: null
    });
});

router.post('/', function(req, res, next) {
    var newMember = new Member({
        account: req.body.account,
        password: req.body.password,
        name: req.body.name,
        phonenum: req.body.phonenum,
        address: req.body.address
    });
    newMember.save(function(err) {
        if (err) {
            next(err);
        } else {
            req.session.member = newMember;
            res.redirect('/login');
        }
    });
});

/* Log  Out*/
router.post('/logout', function(req, res, next) {
    req.session.member = null;
    res.redirect('/');
});

module.exports = router;
