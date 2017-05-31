var express = require('express');
var router = express.Router();
var SupplierMember = require('../../models/SupplierMember');
var Product = require('../../models/Product');

router.get('/:supplierId', function(req, res, next) {
    if (!req.session.member) {
        res.redirect('/login');
    }

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

router.get('/:supplierId/search', function(req, res, next) {
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
