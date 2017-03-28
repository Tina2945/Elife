var express = require('express');
var router = express.Router();
var Member = require('../../models/Member');
var District = require('../../models/District');

router.get('/', function(req, res, next) {
    District.get(function(err, district) {
        res.render('member/register', {
            district: district
        });
    });
});

router.post('/', function(req, res, next) {
    var newMember = new Member({
        name: req.body.name,
        phonenum: req.body.phonenum,
        city: req.body.city,
        hometown: req.body.hometown,
        address: req.body.address,
        account: req.body.account,
        password: req.body.password
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

router.post('/logout', function(req, res, next) {
    req.session.member = null;
    res.redirect('/');
});

module.exports = router;
