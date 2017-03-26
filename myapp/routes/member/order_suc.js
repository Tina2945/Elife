var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('member/order_suc', { 
    	member: req.session.member || null 
    });
});

module.exports = router;
