var express = require('express');
var router = express.Router();
var Third = require('../../models/thirdm');
var Record = require('../../models/Record');
var SupplierMember = require('../../models/SupplierMember');
var Product = require('../../models/Product');
var Member = require('../../models/Member');
var Buy = require('../../models/Buy');
var District = require('../../models/District');
var async = require('async');
/* GET home page. */
router.get('/', function(req, res, next) {
    if (!req.session.third) {
        res.redirect('/thirdlogin');
    }

    Buy.getAll(function(err, nameList) {
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
                    res.render('third/third_order', {
                        third: req.session.third,
                        nameList: nameList || null
                    });

                }



            });
        }

    });

});
router.get('/:name', function(req, res, next) {
    Buy.get(req.params.name, function(err, buyList) {
        if (err) {
            next();
        } else {
            async.each(buyList, function(buy, cb) {
                SupplierMember.get(buy.supplierId, function(err, supplier) {
                    if (err) {
                        cb(err);
                    } else {
                        buy.supplier = supplier;

                        Product.get(buy.productId, function(err, product) {
                            if (err) {
                                cb(err);
                            } else {
                                buy.product = product;
                                cb(null);
                            }
                        });
                    }
                });
            }, function(err) {
                if (err) {
                    console.log(err);
                } else {
                    Member.get(req.params.name, function(err, member) {
                        Buy.sum(req.params.name, function(err, sum) {
                            if (err) {
                                console.log(err);
                            } else {
                                res.render('third/third_detail', {
                                    third: req.session.third || null,
                                    buyList: buyList,
                                    member: member,
                                    sum: sum
                                });
                            }
                        });
                    });
                }
            });
        }
    });
});

router.post('/', function(req, res, next) {

    //首先必須先產生出一個Member的物件在進行save
    var newBuy = new Buy({
        member_id: req.body.id,

        status: true
    });
    newBuy.check(req.body.id, function(err) {
        if (err) {
            res.status = err.code;
            res.json(err);
        } else {
            res.redirect('/third_order');
        }
    });

});
router.post('/take', function(req, res, next) {

    //首先必須先產生出一個Member的物件在進行save
    var newBuy = new Buy({
        member_id: req.body.id,

        received: true
    });
    newBuy.take(req.body.id, function(err) {
        if (err) {
            res.received = err.code;
            res.json(err);
        } else {
            res.redirect('/third_order');
        }
    });

});

/* Log  Out*/
router.post('/logout', function(req, res, next) {
    req.session.third = null;
    res.redirect('/');
});


module.exports = router;
