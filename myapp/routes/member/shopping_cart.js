var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('shopping_cart', {
        member: req.session.member || null,
        date: '2017/02/14'
    });
});

module.exports = router;
