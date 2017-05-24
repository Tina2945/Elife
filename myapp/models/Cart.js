var db = require('../libs/db');
var GeneralErrors = require('../errors/GeneralErrors');

var Cart = function(options) {
    this.id = options.id;
    this.memberId = options.memberId;
    this.supplierId = options.supplierId;
    this.productId = options.productId;
    this.name = options.name;
    this.price = options.price;
    this.quantity = options.quantity;
    this.total = options.total;
    this.paid = options.paid;
    this.date = options.date;
    this.time = options.time;
    this.status = options.status;
    this.thirdId = options.thirdId;
    this.received = options.received;
};

//取得所有購物車內商品
Cart.getAll = function(memberId, cb) {
    db.select()
        .from("buylist")
        .where({
            member_id: memberId,
            paid: 0
        })
        .orderBy("supplier_id")
        .map(function(row) {
            return new Cart({
                id: row.id,
                memberId: row.member_id,
                supplierId: row.supplier_id,
                productId: row.product_id,
                name: row.name,
                price: row.price,
                quantity: row.quantity,
                total: row.total,
                paid: row.paid,
                date: row.date,
                time: row.time,
                status: row.status,
                thirdId: row.third_id,
                received: row.received
            });
        })
        .then(function(cartList) {
            if (cartList.length) {
                cb(null, cartList);
            } else {
                cb(null, null);
            }
        })
        .catch(function(err) {
            console.log(err);
            cb(new GeneralErrors.Database());
        });
};

//放入購物車
Cart.prototype.save = function(cb) {
    db("buylist")
        .insert({
            member_id: this.memberId,
            supplier_id: this.supplierId,
            product_id: this.productId,
            name: this.name,
            price: this.price,
            quantity: this.quantity,
            total: this.total
        })
        .then(function(result) {
            var insertedId = result[0];
            this.id = insertedId;
            cb(null, this);
        }.bind(this))
        .catch(function(err) {
            console.log("CART INSERT", err);
            cb(new GeneralErrors.Database());
        });
};

//刪除購物車內商品
Cart.prototype.delete = function(cb) {
    if (this.id) {
        db("buylist")
            .where({
                id: this.id
            })
            .del()
            .then(function() {
                cb(null, this);
            }.bind(this))
            .catch(function(err) {
                console.log("CART DELETED", err);
                cb(new GeneralErrors.Database());
            });
    }
};

//送出訂單
Cart.prototype.update = function(id, cb) {
    db("buylist")
        .whereIn('id', id)
        .update({
            paid: this.paid,
            date: this.date,
            time: this.time
        })
        .then(function() {
            cb(null, this);
        }.bind(this))
        .catch(function(err) {
            console.log("CART UPDATED", err);
            cb(new GeneralErrors.Database());
        });
};

//寄信取得購物資訊
Cart.get = function(id, cb) {
    db.select()
        .from("buylist")
        .whereIn('id', id)
        .orderBy("supplier_id")
        .map(function(row) {
            return new Cart({
                id: row.id,
                memberId: row.member_id,
                supplierId: row.supplier_id,
                productId: row.product_id,
                name: row.name,
                price: row.price,
                quantity: row.quantity,
                total: row.total,
                paid: row.paid,
                date: row.date,
                time: row.time,
                status: row.status,
                thirdId: row.third_id,
                received: row.received
            });
        })
        .then(function(cartList) {
            if (cartList.length) {
                cb(null, cartList);
            } else {
                cb(null, null);
            }
        })
        .catch(function(err) {
            console.log(err);
            cb(new GeneralErrors.Database());
        });
};

module.exports = Cart;
