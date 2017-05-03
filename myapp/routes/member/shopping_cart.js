var express = require('express');
var router = express.Router();
var Cart = require('../../models/Cart');
var SupplierMember = require('../../models/SupplierMember');
var async = require('async');

router.get('/', function(req, res, next) {
    if (!req.session.member) {
        res.redirect('/login');
    }

    Cart.getAll(req.session.member.id, function(err, cartList) {
        if (err) {
            next();
        } else {
            if (cartList) {
                async.each(cartList, function(cart, cb) {
                    SupplierMember.get(cart.supplierId, function(err, supplier) {
                        if (err) {
                            cb(err);
                        } else {
                            cart.supplier = supplier;
                            cb(null);
                        }
                    });
                }, function(err) {
                    if (err) {
                        next();
                    } else {
                        Cart.sum(req.session.member.id, function(err, sum) {
                            if (err) {
                                console.log(err);
                            } else {
                                res.render('member/shopping_cart', {
                                    member: req.session.member,
                                    cartList: cartList,
                                    sum: sum
                                });
                            }
                        })
                    }
                });
            } else {
                res.render('member/shopping_cart', {
                    member: req.session.member,
                    cartList: null
                });
            }
        }
    })
});

router.get('/:cartId', function(req, res, next) {
    var newCart = new Cart({
        id: req.params.cartId
    });

    newCart.delete(function(err) {
        if (err) {
            next();
        } else {
            res.redirect('/shopping_cart');
        }
    });

});

router.post('/', function(req, res) {
    var d = new Date();
    date = d.toLocaleDateString();
    time = d.toLocaleTimeString();

    for (i in req.body.cartId) {
        var newCart = new Cart({
            id: req.body.cartId[i],
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
        name: req.body.name,
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

module.exports = router;
