var express = require('express');
var router = express.Router();
var SupplierMember = require('../../models/SupplierMember');
var Product = require('../../models/Product');

var zmq = require('zeromq');
var subscriber = zmq.socket('sub');
subscriber.connect('tcp://localhost:5563');

router.get('/:supplierId', function(req, res, next) {
    if (!req.session.member) {
        res.redirect('/login');
    }

    // subscriber.subscribe("1");
    // subscriber.on('message', function(data) {
    //     console.log("receive");
    //     var msg = [];
    //     Array.prototype.slice.call(arguments).forEach(function(arg) {
    //         msg.push(arg.toString());
    //     });
    //     res.json(msg[1]);
    // });

    Product.getAll(req.params.supplierId, function(err, productList) {
        if (err) {
            next();
        } else {
            SupplierMember.get(req.params.supplierId, function(err, supplier) {
                if (err) {
                    console.log(err);
                } else {
                    res.render('member/store', {
                        member: req.session.member,
                        supplier: supplier,
                        productList: productList || null
                    });
                }
            })
        }
    });
});

router.get('/:supplierId/search', function(req, res) {
    if (!req.session.member) {
        res.redirect('/login');
    }

    Product.search(req.params.supplierId, req.query.name, function(err, productList) {
        if (err) {
            next();
        } else {
            SupplierMember.get(req.params.supplierId, function(err, supplier) {
                if (err) {
                    console.log(err);
                } else {
                    res.render('member/store', {
                        member: req.session.member,
                        supplier: supplier,
                        productList: productList || null
                    });
                }
            })
        }
    });
});

module.exports = router;
