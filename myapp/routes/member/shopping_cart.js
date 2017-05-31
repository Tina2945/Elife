var express = require('express');
var router = express.Router();
var Cart = require('../../models/Cart');
var SupplierMember = require('../../models/SupplierMember');
var async = require('async');
var dateFormat = require('dateformat');
var fs = require('fs');
var ejs = require('ejs');
var transporter = require('../../libs/mail');

dateFormat.masks.date = 'yyyy-mm-dd';
dateFormat.masks.time = 'HH:MM:ss';

var DateTimezone = function(offset) {
    d = new Date();
    utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    return new Date(utc + (3600000 * offset));
}

router.get('/', function(req, res, next) {
    if (!req.session.member) {
        res.redirect('/login');
    }

    var sum = 0;
    Cart.getAll(req.session.member.id, function(err, cartList) {
        if (err) {
            next();
        } else {
            if (cartList) {
                async.each(cartList, function(cart, cb) {
                    sum += cart.total;
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
                        if (err) {
                            console.log(err);
                        } else {
                            res.render('member/shopping_cart', {
                                member: req.session.member,
                                cartList: cartList,
                                sum: sum
                            });
                        }
                    }
                });
            } else {
                res.render('member/shopping_cart', {
                    member: req.session.member,
                    cartList: null
                });
            }
        }
    });
});

router.get('/:cartId', function(req, res, next) {
    if (!req.session.member) {
        res.redirect('/login');
    }

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

router.post('/', function(req, res, next) {
    var taipei = DateTimezone(8);
    var date = dateFormat(taipei, "date");
    var time = dateFormat(taipei, "time");

    var id = [];
    if (typeof(req.body.cartId) == "object") {
        id = req.body.cartId;
    } else {
        id.push(req.body.cartId);
    }

    if (req.session.member.email) {
        var sum = 0;
        Cart.get(id, function(err, cartList) {
            if (err) {
                next(err);
            } else {
                async.each(cartList, function(cart, cb) {
                    sum += cart.total;
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
                        next(err);
                    } else {
                        fs.readFile('./views/member/mailContent.ejs', 'utf8', function(err, template) {
                            if (err) {
                                console.log(err);
                            }
                            var compiledTemplate = ejs.render(template, {
                                customer: req.session.member.name,
                                cartList: cartList,
                                sum: sum
                            });
                            var options = {
                                from: '"Elife" <nccumis.elife@gmail.com>',
                                to: req.session.member.email,
                                subject: 'Elife系統通知',
                                html: compiledTemplate
                            }
                            transporter.sendMail(options, function(error, info) {
                                if (error) {
                                    console.log(error);
                                } else {
                                    console.log('訊息發送: ' + info.response);
                                }
                            });
                        });
                    }
                });
            }
        });
    }

    var newCart = new Cart({
        paid: true,
        date: date,
        time: time
    });
    
    newCart.update(id, function(err, cartList) {
        if (err) {
            res.status = err.code;
            res.json(err);
        } else {
            res.redirect('/order_suc');
        }
    });
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
            res.status = err.code;
            res.json(err);
        } else {
            res.redirect('/store/' + req.body.supplierId);
        }
    });
});

module.exports = router;
