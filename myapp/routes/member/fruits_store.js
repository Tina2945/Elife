var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('fruits_store', { 
    	fruit_store: '政大水果店' 
    });
});

module.exports = router;
