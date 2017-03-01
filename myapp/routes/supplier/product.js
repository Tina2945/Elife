var express = require('express');
var router = express.Router();
var upload = require('../../libs/upload');
var imgur = require('../../libs/imgur')
var Product = require('../../models/Product');
var SupplierMember = require('../../models/supplierm');
var fs = require('fs');
var async = require('async');

router.get('/', function(req, res, next) {
    if (!req.session.supplierm) {
        res.redirect('/supplierlogin');
    }

    Product.getAll(function(err, productList) {
        if (err) {
            next();
        } else {
            async.each(productList, function(product, cb) {
                SupplierMember.get(product.supplierId, function(err, supplier) {
                    if (err) {
                        cb(err);
                    } else {
                        product.supplier = supplier;
                        cb(null);
                    }
                });
            }, function(err) {
                if (err) {
                    res.status = err.code;
                    next();
                } else {
                    res.render('product', {
                        supplierm: req.session.supplierm || null,
                        productList: productList
                    });
                }
            });
        }
    });
});

router.post('/add', upload.single('photo'), function(req, res) {
    var tmpPath = req.file.path;
    var albumId = 'fZS2i';

    imgur.uploadFile(tmpPath, albumId)
        .then(function(json) {
            //console.log(json.data.link);
            var newProduct = new Product({
                name: req.body.name,
                price: req.body.price,
                description: req.body.description,
                photo: json.data.link,
                supplierId: req.session.supplierm.id
            });
            newProduct.save(function(err) {
                if (err) {
                    res.status = err.code;
                    res.json(err);
                } else {
                    res.redirect('/product');
                }
            });
            fs.unlink(tmpPath);
        })
        .catch(function(err) {
            console.error(err.message);
        });
});

router.post('/edit', upload.single('photo'), function(req, res) {
    var tmpPath = req.file.path;
    var albumId = 'fZS2i';

    imgur.uploadFile(tmpPath, albumId)
        .then(function(json) {
            //console.log(json.data.link);
            var newProduct = new Product({
                name: req.body.name,
                price: req.body.price,
                description: req.body.description,
                photo: json.data.link,
                supplierId: req.session.supplierm.id
            });
            newProduct.save(function(err) {
                if (err) {
                    res.status = err.code;
                    res.json(err);
                } else {
                    res.redirect('/product');
                }
            });
            fs.unlink(tmpPath);
        })
        .catch(function(err) {
            console.error(err.message);
        });
});

module.exports = router;
