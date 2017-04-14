var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	if(!req.session.supplierm){
		res.redirect('/');
	}
	
    res.render('supplier/order_detail', {
        supplierm: req.session.supplierm || null
    });
});

module.exports = router;