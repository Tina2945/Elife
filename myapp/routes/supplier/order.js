var express = require('express');
var router = express.Router();
var Order = require('../../models/Order');
var async = require('async');

router.get('/', function(req, res, next) {
    if (!req.session.supplierm) {
        res.redirect('/supplierlogin');
    }

    Order.getAll(req.session.supplierm.id, function(err, nameList) {
        if (err) {
            next();
        } else {
            res.render('supplier/order', {
                supplierm: req.session.supplierm,
                nameList: nameList || null
            });

        }
    });
});

router.get('/:memberId/:date/:time', function(req, res, next) {
    var sum = 0;
    Order.get(req.params.memberId, req.session.supplierm.id, req.params.date, req.params.time, function(err, orderList) {
        if (err) {
            next();
        } else {
            async.each(orderList, function(order) {
                sum += order.total;
            });

            res.render('supplier/order_detail', {
                supplierm: req.session.supplierm,
                date: req.params.date,
                time: req.params.time,
                orderList: orderList,
                sum: sum
            });
        }
    });
});

module.exports = router;
