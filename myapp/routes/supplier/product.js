var express = require('express');
var router = express.Router();
var upload = require('../../libs/upload');
var imgur = require('../../libs/imgur')
var Product = require('../../models/Product');
var fs = require('fs');

router.get('/', function(req, res, next) {
    if (!req.session.supplierm) {
        res.redirect('/supplierlogin');
    }

    Product.getAll(req.session.supplierm.id, function(err, productList) {
        if (err) {
            next();
        } else {
            res.render('supplier/product', {
                supplierm: req.session.supplierm,
                productList: productList || null
            });
        }
    });
});

router.get('/add', function(req, res) {
    if (!req.session.supplierm) {
        res.redirect('/supplierlogin');
    }

    res.render('supplier/add', {
        supplierm: req.session.supplierm
    });
});

router.post('/add/save', upload.single('photo'), function(req, res) {
    var tmpPath = req.file.path;
    var albumId = '3A5mz';

    imgur.uploadFile(tmpPath, albumId)
        .then(function(json) {
            var newProduct = new Product({
                name: req.body.name,
                price: req.body.price,
                description: req.body.description,
                photo: json.data.link,
                supplierId: req.session.supplierm.id,
                storeName: req.session.supplierm.storeName
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

router.post('/edit', function(req, res) {
    Product.get(req.body.id, function(err, product) {
        if (err) {
            console.log(err);
        } else {
            res.render('supplier/edit', {
                product: product
            });
        }
    });
});

router.post('/edit/save', upload.single('photo'), function(req, res) {
    if (req.file) {
        var tmpPath = req.file.path;
        var albumId = '3A5mz';

        imgur.uploadFile(tmpPath, albumId)
            .then(function(json) {
                var newProduct = new Product({
                    id: req.body.id,
                    name: req.body.name,
                    price: req.body.price,
                    description: req.body.description,
                    photo: json.data.link
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
    } else {
        var newProduct = new Product({
            id: req.body.id,
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            photo: req.body.url,
        });
        newProduct.save(function(err) {
            if (err) {
                res.status = err.code;
                res.json(err);
            } else {
                res.redirect('/product');
            }
        });
    }
});

router.post('/delete', function(req, res) {
    var newProduct = new Product({
        id: req.body.id
    });
    newProduct.delete(function(err) {
        if (err) {
            res.status = err.code;
            res.json(err);
        } else {
            res.redirect('/product');
        }
    });
});

module.exports = router;
