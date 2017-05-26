var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	if (!req.session.member) {
        res.redirect('/login');
    }

    res.render('member/order_suc', { 
    	member: req.session.member
    });
});

module.exports = router;
