var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('strawberry',{member : req.session.member || null});
});

module.exports = router;

