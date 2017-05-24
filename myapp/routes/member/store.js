var express = require('express');
var router = express.Router();
var SupplierMember = require('../../models/SupplierMember');
var Product = require('../../models/Product');
var socket_io = require('socket.io');
var zmq = require('zeromq');
var subscriber = zmq.socket('sub');

function zeropad(num) {
    while (num.length < 4) {
        num = "0" + num;
    }
    return num;
};

//ZMQ subscribe
router.prepareSocketIO = function(server) {
    var io = socket_io.listen(server);
    io.sockets.on('connection', function(socket) {
        subscriber.on('message', function(data) {
            //console.log("receive");
            var msg = [];
            Array.prototype.slice.call(arguments).forEach(function(arg) {
                msg.push(arg.toString());
            });
            socket.emit('msg', {
                'product': msg[1]
            });
        });
    });
};

router.get('/:supplierId', function(req, res, next) {
    if (!req.session.member) {
        res.redirect('/login');
    }

    subscriber.connect('tcp://localhost:5563');
    subscriber.subscribe(zeropad(req.params.supplierId));

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

router.get('/:supplierId/search', function(req, res) {
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
