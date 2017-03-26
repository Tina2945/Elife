var db = require('../libs/db');
var GeneralErrors = require('../errors/GeneralErrors');

var Cart = function(options) {
    this.id = options.id;
    this.memberId = options.memberId;
    this.supplierId = options.supplierId;
    this.productId = options.productId;
    this.price = options.price;
    this.quantity = options.quantity;
    this.total = options.total;
    this.paid = options.paid;
    this.status = options.status;
    this.date = options.date;
    this.time = options.time;
};

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
                price: row.price,
                quantity: row.quantity,
                total: row.total,
                paid: row.paid,
                status: row.status,
                date: row.date,
                time: row.time
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

Cart.prototype.save = function(cb) {
    if (this.id) {
        db("buylist")
            .where({
                id: this.id
            })
            .update({
                quantity: this.quantity,
                total: this.total,
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
    } else {
        db("buylist")
            .insert({
                member_id: this.memberId,
                supplier_id: this.supplierId,
                product_id: this.productId,
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
    }
};

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

module.exports = Cart;