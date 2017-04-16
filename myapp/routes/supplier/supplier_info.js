var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	if(!req.session.supplierm){
		res.redirect('/supplierlogin');
	}
	
    res.render('supplier/supplier_info', {
        supplierm: req.session.supplierm
    });
});

module.exports = router;
