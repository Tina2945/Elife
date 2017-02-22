var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('home',{member : req.session.member || null,fruit_store:'政大水果店',veg_store:'政大蔬菜店',fifty_store:'50嵐',watsons:'屈臣氏',pharmacy:'政大藥局'});
});

module.exports = router;

