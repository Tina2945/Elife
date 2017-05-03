var express = require('express');
var router = express.Router();
var Record = require('../../models/Record');
var SupplierMember = require('../../models/SupplierMember');
var async = require('async');

router.get('/', function(req, res, next) {
    if (!req.session.member) {
        res.redirect('/login');
    }

    Record.getAll(req.session.member.id, function(err, dateList) {
        if (err) {
            next();
        } else {
            res.render('member/purchase_rec', {
                member: req.session.member,
                dateList: dateList || null
            });
        }
    });
});

router.get('/:dateTime', function(req, res, next) {
    if (!req.session.member) {
        res.redirect('/login');
    }

    var dt = (req.params.dateTime).split(" ");
    date = dt[0];
    time = dt[1];

    Record.get(req.session.member.id, date, time, function(err, recordList) {
        if (err) {
            next();
        } else {
            async.each(recordList, function(record, cb) {
                SupplierMember.get(record.supplierId, function(err, supplier) {
                    console.log(supplier);
                    
                    if (err) {
                        cb(err);
                    } else {
                        record.supplier = supplier;
                        cb(null);
                    }
                });
            }, function(err) {
                if (err) {
                    next();
                } else {
                    Record.sum(req.session.member.id, date, time, function(err, sum) {
                        if (err) {
                            console.log(err);
                        } else {
                            res.render('member/record_detail', {
                                member: req.session.member,
                                date: date,
                                time: time,
                                recordList: recordList,
                                sum: sum
                            });
                        }
                    });
                }
            });
        }
    })
});

module.exports = router;
