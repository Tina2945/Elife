var express = require('express');
var router = express.Router();
var Member = require('../../models/Member');
var District = require('../../models/District');

router.get('/', function(req, res, next) {
    District.get(function(err, district) {
        res.render('member/personal_edit', {
            member: req.session.member,
            district: district
        });
    });
});

router.post('/edit', function(req, res) {
    var newMember = new Member({
        id: req.body.id,
        name: req.body.name,
        phonenum: req.body.phonenum,
        email: req.body.email,
        city: req.body.city,
        hometown: req.body.hometown,
        address: req.body.address,
        card1: req.body.card1,
        card2: req.body.card2,
        card3: req.body.card3,
        card4: req.body.card4
    });

    newMember.save(function(err) {
        if (err) {
            res.status = err.code;
            res.json(err);
        } else {
            req.session.member = newMember;
            res.redirect('/personal_info');
        }
    });
});

module.exports = router;
