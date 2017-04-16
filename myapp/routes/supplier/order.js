var express = require('express');
var router = express.Router();
var Order = require('../../models/Order');
var async = require('async');

router.get('/', function(req, res, next) {
    if (!req.session.supplierm) {
        res.redirect('/supplierlogin');
    }

    Order.getAll(req.session.supplierm.id, function(err, dateList) {
        if (err) {
            next();
        } else {
            res.render('supplier/order', {
                supplierm: req.session.supplierm,
                dateList: dateList || null
            });
        }
    });
});

router.get('/:date', function(req, res, next) {
    Order.get(req.session.supplierm.id, req.params.date, function(err, orderList) {
        if (err) {
            next();
        } else {
            res.render('supplier/order_detail', {
                supplierm: req.session.supplierm,
                date: req.params.date,
                orderList: orderList
            });
        }
    });
});

module.exports = router;
