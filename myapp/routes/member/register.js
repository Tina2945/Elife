var express = require('express');
var router = express.Router();
var Member = require('../../models/Member');
var District = require('../../models/District');
var crypto = require('crypto');

router.get('/', function(req, res, next) {
    District.get(function(err, district) {
        res.render('member/register', {
            district: district
        });
    });
});

router.post('/', function(req, res, next) {
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('hex');

    var newMember = new Member({
        name: req.body.name,
        phonenum: req.body.phonenum,
        email: req.body.email,
        city: req.body.city,
        hometown: req.body.hometown,
        address: req.body.address,
        card1: req.body.card1,
        card2: req.body.card2,
        card3: req.body.card3,
        card4: req.body.card4,
        account: req.body.account,
        password: password
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
