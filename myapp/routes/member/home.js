var express = require('express');
var router = express.Router();
var Follow = require('../../models/Follow');
var SupplierMember = require('../../models/SupplierMember');
var async = require('async');
var socket_io = require('socket.io');
var zmq = require('zeromq');
var subscriber = zmq.socket('sub');
subscriber.connect('tcp://140.119.19.17:5563');

var zeropad = function(num) {
    while (num.length < 4) {
        num = "0" + num;
    }
    return num;
};

//ZMQ subscribe
router.prepareSocketIO = function(server) {
    var io = socket_io.listen(server);
    io.sockets.on('connection', function(socket) {
        //console.log("connect")
        subscriber.on('message', function() {
            //console.log("sub")
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

router.get('/', function(req, res, next) {
    if (!req.session.member) {
        res.redirect('/login');
    }

    Follow.getAll(req.session.member.id, function(err, followList) {
        if (err) {
            next();
        } else {
            async.each(followList, function(follow, cb) {

                //ZMQ subscribe
                subscriber.subscribe(zeropad(follow.supplierId.toString()));

                SupplierMember.get(follow.supplierId, function(err, supplier) {
                    if (err) {
                        cb(err);
                    } else {
                        follow.supplier = supplier;
                        cb(null);
                    }
                });
            }, function(err) {
                if (err) {
                    console.log(err);
                } else {
                    SupplierMember.getAll(req.session.member.city, req.session.member.hometown, function(err, supplierList) {
                        if (err) {
                            next();
                        } else {
                            res.render('member/home', {
                                member: req.session.member,
                                followList: followList || null,
                                supplierList: supplierList || null
                            });
                        }
                    });
                }
            });
        }
    });
});

router.post('/follow', function(req, res) {
    var newFollow = new Follow({
        memberId: req.session.member.id,
        supplierId: req.body.supplierId
    });

    newFollow.save(function(err) {
        if (err) {
            res.status = err.code;
            res.json(err);
        } else {
            res.redirect('/home');
        }
    });
});

router.post('/unfollow', function(req, res) {
    var newFollow = new Follow({
        followId: req.body.id
    });

    newFollow.delete(function(err) {
        if (err) {
            res.status = err.code;
            res.json(err);
        } else {
            res.redirect('/home');
        }
    });
});

module.exports = router;
