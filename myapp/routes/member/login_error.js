var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('member/login_error') ;
});

module.exports = router;
