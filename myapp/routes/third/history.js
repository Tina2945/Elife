var express = require('express');
var router = express.Router();
var Third = require('../../models/Third');
var SupplierMember = require('../../models/SupplierMember');
var Member = require('../../models/Member');
var Buy = require('../../models/Buy');
var async = require('async');

router.get('/', function(req, res, next) {
    if (!req.session.third) {
        res.redirect('/thirdlogin');
    }

    Buy.getHistory(function(err, nameList) {
        if (err) {
            console.log(err);
        } else {
            res.render('third/history', {
                third: req.session.third,
                nameList: nameList || null
            });
        }
    });
});

router.get('/:memberId/:date/:time/:thirdId', function(req, res, next) {
    if (!req.session.third) {
        res.redirect('/thirdlogin');
    }

    var sum = 0;
    Third.get(req.params.thirdId, function(err, third) {
        if (err) {
            next();
        } else {
            Buy.getDetail(req.params.memberId, req.params.date, req.params.time, function(err, buyList) {
                if (err) {
                    next();
                } else {
                    async.each(buyList, function(buy, cb) {
                        sum += buy.total;
                        SupplierMember.get(buy.supplierId, function(err, supplier) {
                            if (err) {
                                cb(err);
                            } else {
                                buy.supplier = supplier;
                                cb(null);
                            }
                        });
                    }, function(err) {
                        if (err) {
                            console.log(err);
                        } else {
                            Member.get(req.params.memberId, function(err, member) {
                                if (err) {
                                    next();
                                } else {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        res.render('third/history_detail', {
                                            third: third,
                                            date: req.params.date,
                                            time: req.params.time,
                                            buyList: buyList,
                                            member: member,
                                            sum: sum
                                        });
                                    }
                                }
                            });
                        }
                    });
                }
            });
        }
    });
});

module.exports = router;
