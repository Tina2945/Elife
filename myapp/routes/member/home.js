var express = require('express');
var router = express.Router();
var Follow = require('../../models/Follow');
var SupplierMember = require('../../models/SupplierMember');
var async = require('async');

router.get('/', function(req, res, next) {
    if (!req.session.member) {
        res.redirect('/');
    }

    Follow.getAll(req.session.member.id, function(err, followList) {
        if (err) {
            next();
        } else {
            async.each(followList, function(follow, cb) {
                SupplierMember.get(follow.supplierId, function(err, supplier) {
                    if (err) {
                        cb(err);
                    } else {
                        follow.supplier = supplier;
                        cb(null);
                    }
                });
            }, function(err) {
                if (err) {
                    res.status = err.code;
                    next();
                } else {
                    SupplierMember.getAll(function(err, supplierList) {
                        if (err) {
                            next();
                        } else {
                            res.render('home', {
                                member: req.session.member || null,
                                followList: followList,
                                supplierList: supplierList
                            });
                        }
                    });
                }
            });
        }
    });
});

router.post('/follow', function(req, res) {
    var newFollow = new Follow({
        memberId: req.session.member.id,
        supplierId: req.body.supplierId
    });

    newFollow.save(function(err) {
        if (err) {
            res.status = err.code;
            res.json(err);
        } else {
            res.redirect('/home');
        }
    });
});

router.post('/unfollow', function(req, res) {
    var newFollow = new Follow({
        id: req.body.id
    });

    newFollow.delete(function(err) {
        if (err) {
            res.status = err.code;
            res.json(err);
        } else {
            res.redirect('/home');
        }
    });
});

module.exports = router;
