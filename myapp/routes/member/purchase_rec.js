var express = require('express');
var router = express.Router();
var Record = require('../../models/Record');
var SupplierMember = require('../../models/SupplierMember');
var Product = require('../../models/Product');
var async = require('async');

router.get('/', function(req, res, next) {
    Record.getAll(req.session.member.id, function(err, dateList) {
        if (err) {
            next();
        } else {
            res.render('member/purchase_rec', {
                member: req.session.member || null,
                dateList: dateList || null
            });
        }
    });
});

router.get('/:date', function(req, res, next) {
    // Record.get(req.session.member.id, req.params.date, function(err, recordList) {
    //     if (err) {
    //         next();
    //     } else {
    //         res.render('member/record_detail', {
    //             member: req.session.member || null,
    //             date: req.params.date,
    //             recordList: recordList
    //         });
    //     }
    // });
    // console.log(req.params.dateTime);

    // var date = (req.params.dateTime).split(" ");
    // console.log(date);
    // console.log(date[0]);

    Record.get(req.session.member.id, req.params.date, function(err, recordList) {
        if (err) {
            next();
        } else {
            async.each(recordList, function(record, cb) {
                SupplierMember.get(record.supplierId, function(err, supplier) {
                    if (err) {
                        cb(err);
                    } else {
                        record.supplier = supplier;

                        Product.get(record.productId, function(err, product) {
                            if (err) {
                                cb(err);
                            } else {
                                record.product = product;
                                cb(null);
                            }
                        });
                    }
                });
            }, function(err) {
                if (err) {
                    console.log(err);
                } else {
                    res.render('member/record_detail', {
                        member: req.session.member || null,
                        date: req.params.date,
                        recordList: recordList
                    });
                }
            });
        }
    })
});

module.exports = router;
