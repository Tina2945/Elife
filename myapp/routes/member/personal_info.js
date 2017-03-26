var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('member/personal_info', {
        member: req.session.member || null
    });
});

module.exports = router;
