var express = require('express');
var router = express.Router();
var Cart = require('../../models/Cart');
var SupplierMember = require('../../models/SupplierMember');
var Product = require('../../models/Product');
var async = require('async');

router.get('/', function(req, res, next) {
    Cart.getAll(req.session.member.id, function(err, cartList) {
        if (err) {
            next();
        } else {
            async.each(cartList, function(cart, cb) {
                SupplierMember.get(cart.supplierId, function(err, supplier) {
                    if (err) {
                        cb(err);
                    } else {
                        cart.supplier = supplier;

                        Product.get(cart.productId, function(err, product) {
                            if (err) {
                                cb(err);
                            } else {
                                cart.product = product;
                                cb(null);
                            }
                        });
                    }
                });
            }, function(err) {
                if (err) {
                    console.log(err);
                } else {
                    res.render('member/shopping_cart', {
                        member: req.session.member || null,
                        cartList: cartList || null
                    });
                }
            });
        }
    })

});

router.post('/', function(req, res) {
    var d = new Date();
    date = d.toLocaleDateString();
    time = d.toLocaleTimeString();

    for (i in req.body.cartId) {
        var newCart = new Cart({
            id: req.body.cartId[i],
            quantity: req.body.cartQ[i],
            total: req.body.cartP[i],
            paid: true,
            date: date,
            time: time
        });

        newCart.save(function(err) {
            if (err) {
                next(err);
            }
        });
    }

    res.redirect('/order_suc');
});

router.post('/add', function(req, res) {
    var newCart = new Cart({
        memberId: req.session.member.id,
        supplierId: req.body.supplierId,
        productId: req.body.id,
        price: req.body.price,
        quantity: req.body.quantity,
        total: req.body.price * req.body.quantity
    });

    newCart.save(function(err) {
        if (err) {
            next(err);
        } else {
            res.redirect('/store/' + req.body.supplierId);
        }
    });
});

router.post('/delete', function(req, res) {
    var newCart = new Cart({
        id: req.body.id
    });

    newCart.delete(function(err) {
        if (err) {
            res.status = err.code;
            res.json(err);
        } else {
            res.redirect('/shopping_cart');
        }
    });
});

module.exports = router;
