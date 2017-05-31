var express = require('express');
var router = express.Router();
var SupplierMember = require('../../models/SupplierMember');
var Member = require('../../models/Member');
var Buy = require('../../models/Buy');
var async = require('async');

router.get('/', function(req, res, next) {
    if (!req.session.third) {
        res.redirect('/thirdlogin');
    }

    Buy.getMine(req.session.third.id, function(err, nameList) {
        if (err) {
            next();
        } else {
            async.each(nameList, function(buy, cb) {
                Member.get(buy.memberId, function(err, member) {
                    if (err) {
                        cb(err);
                    } else {
                        buy.member = member;
                        cb(null);
                    }
                });
            }, function(err) {
                if (err) {
                    console.log(err);
                } else {
                    res.render('third/my_order', {
                        third: req.session.third,
                        nameList: nameList || null
                    });
                }
            });
        }
    });
});

router.get('/:memberId/:date/:time', function(req, res, next) {
    if (!req.session.third) {
        res.redirect('/thirdlogin');
    }

    var sum = 0;
    Buy.getOrder(req.params.memberId, req.params.date, req.params.time, req.session.third.id, function(err, buyList) {
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
                                res.render('third/my_detail', {
                                    third: req.session.third,
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
});

router.post('/', function(req, res) {
    var id = [];
    if (typeof(req.body.buyId) == "object") {
        id = req.body.buyId;
    } else {
        id.push(req.body.buyId);
    }

    var newBuy = new Buy({
        received: true
    });

    newBuy.update(id, function(err) {
        if (err) {
            res.status = err.code;
            res.json(err);
        } else {
            res.redirect('/my_order');
        }
    });
});

module.exports = router;
