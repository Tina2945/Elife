var express = require('express');
var router = express.Router();
var District = require('../../models/District');
var SupplierMember = require('../../models/SupplierMember');
var upload = require('../../libs/upload');
var imgur = require('../../libs/imgur')
var fs = require('fs');

router.get('/', function(req, res, next) {
    District.get(function(err, district) {
        res.render('supplier/supplier', {
            district: district
        });
    });
});

router.post('/', upload.single('photo'), function(req, res, next) {
    var tmpPath = req.file.path;
    var albumId = 'Bna6j';

    imgur.uploadFile(tmpPath, albumId)
        .then(function(json) {
            var newSupplierMember = new SupplierMember({
                storeName: req.body.storeName,
                photo: json.data.link,
                name: req.body.name,
                phonenum: req.body.phonenum,
                city: req.body.city,
                hometown: req.body.hometown,
                address: req.body.address,
                card1: req.body.card1,
                card2: req.body.card2,
                card3: req.body.card3,
                card4: req.body.card4,
                account: req.body.account,
                password: req.body.password
            });
            newSupplierMember.save(function(err) {
                if (err) {
                    next(err);
                } else {
                    req.session.supplierm = newSupplierMember;
                    res.redirect('/supplierlogin');
                }
            });
            fs.unlink(tmpPath);
        })
        .catch(function(err) {
            console.error(err.message);
        });
});

router.post('/logout', function(req, res, next) {
    req.session.supplierm = null;
    res.redirect('/');
});

module.exports = router;
