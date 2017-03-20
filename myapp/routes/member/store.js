var express = require('express');
var router = express.Router();
var SupplierMember = require('../../models/SupplierMember');
var Product = require('../../models/Product');

router.get('/:supplierId/:storeName', function(req, res, next) {
    if (!req.session.member) {
        res.redirect('/');
    }

    Product.getAll(req.params.supplierId, function(err, productList) {
        if (err) {
            next();
        } else {
            res.render('store', {
                storeName: req.params.storeName,
                member: req.session.member || null,
                productList: productList || null
            });
        }
    });
});

module.exports = router;
