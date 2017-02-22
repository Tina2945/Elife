var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('purchase_list',{member : req.session.member || null,date:'2017/02/14'});
});

module.exports = router;
