var express = require('express');
var router = express.Router();
var upload = require('../../libs/upload');
var imgur = require('../../libs/imgur')
var Product = require('../../models/Product');
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('add');
});

router.post('/add', upload.single('photo'), function(req, res) {
    //console.log(req.file);
var newProduct = new Product({
                name: req.body.name,
                price: req.body.price,
                description: req.body.description
            });
            newProduct.save(function(err) {
                if (err) {
                    res.status = err.code;
                    res.json(err);
                } else {
                    res.redirect('/add');
                }
            });

    // var tmpPath = req.file.path;
    // var albumId = 'fZS2i';

    // imgur.uploadFile(tmpPath, albumId)
    //     .then(function (json) {
    //         //console.log(json.data.link);
    //         var newProduct = new Product({
    //             name: req.body.name,
    //             price: req.body.price,
    //             description: req.body.description,
    //             photo: json.data.link
    //         });
    //         newProduct.save(function(err) {
    //             if (err) {
    //                 res.status = err.code;
    //                 res.json(err);
    //             } else {
    //                 res.redirect('/add');
    //             }
    //         });
    //         fs.unlink(tmpPath);
    //     })
    //     .catch(function (err) {
    //         console.error(err.message);
    //     });    
});

module.exports = router;