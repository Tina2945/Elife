var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('supplier/supplierlogin_error') ;
});

module.exports = router;
