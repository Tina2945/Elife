var express = require('express');
var router = express.Router();
var Member = require('../models/Member');
var async = require('async');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index') ;

});



module.exports = router;
