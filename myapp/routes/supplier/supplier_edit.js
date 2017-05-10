var express = require('express');
var router = express.Router();
var District = require('../../models/District');
var SupplierMember = require('../../models/SupplierMember');
var upload = require('../../libs/upload');
var imgur = require('../../libs/imgur')
var fs = require('fs');

router.get('/', function(req, res, next) {
    if (!req.session.supplierm) {
        res.redirect('/supplierlogin');
    }

    District.get(function(err, district) {
        res.render('supplier/supplier_edit', {
            supplierm: req.session.supplierm,
            district: district
        });
    });
});

router.post('/edit', upload.single('photo'), function(req, res) {
    if (req.file) {
        var tmpPath = req.file.path;
        var albumId = 'Bna6j';

        imgur.uploadFile(tmpPath, albumId)
            .then(function(json) {
                var newSupplierMember = new SupplierMember({
                    id: req.body.id,
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
                    card4: req.body.card4
                });
                newSupplierMember.save(function(err) {
                    if (err) {
                        res.status = err.code;
                        res.json(err);
                    } else {
                        req.session.supplierm = newSupplierMember;
                        res.redirect('/supplier_info');
                    }
                });
                fs.unlink(tmpPath);
            })
            .catch(function(err) {
                console.error(err.message);
            });
    } else {
        var newSupplierMember = new SupplierMember({
            id: req.body.id,
            storeName: req.body.storeName,
            name: req.body.name,
            phonenum: req.body.phonenum,
            city: req.body.city,
            hometown: req.body.hometown,
            address: req.body.address,
            card1: req.body.card1,
            card2: req.body.card2,
            card3: req.body.card3,
            card4: req.body.card4
        });
        newSupplierMember.save(function(err) {
            if (err) {
                res.status = err.code;
                res.json(err);
            } else {
                req.session.supplierm = newSupplierMember;
                res.redirect('/supplier_info');
            }
        });
    }
});

module.exports = router;
