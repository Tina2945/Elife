var db = require('../libs/db');
var GeneralErrors = require('../errors/GeneralErrors');

var Buy = function(options) {
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
    this.thirdId = options.thirdId;
    this.received = options.received;
};

Buy.getAll = function(cb) {
    db.groupBy("member_id")
        .select()
        .from("buylist")
        .where({
            paid: 1,
            received:0
           
        })

    .map(function(row) {
            

            return new Buy({
                memberId: row.member_id,
                status: row.status

            });

        })
        .then(function(nameList) {
            if (nameList.length) {
                cb(null, nameList);
            } else {
                cb(null, null);
            }

        })
        .catch(function(err) {
            console.log(err);
            cb(new GeneralErrors.Database());
        });

};

Buy.get = function(memberId, cb) {
    db.select()
        .from("buylist")
        .where({
            member_id: memberId,
            paid: 1,
            
            received:0
        })
        .map(function(row) {
            return new Buy({
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
                time: row.time,
                thirdId: row.third_id,
                received:row.received
            });
        })
        .then(function(buyList) {
            if (buyList.length) {
                cb(null, buyList);
            } else {
                cb(null, new GeneralErrors.NotFound());
            }
        })
        .catch(function(err) {
            cb(err);
        });
};
Buy.prototype.check = function(memberId,cb) {
    db("buylist")
        .where({
            member_id: memberId,
            paid: 1,
            status:0
            
        })
        .update({
            status: this.status
            
        })
        .then(function() {
            cb(null, this);
        }.bind(this))
        .catch(function(err) {
            console.log("PRODUCT UPDATED", err);
            cb(new GeneralErrors.Database());
        });
};
Buy.prototype.take = function(memberId,cb) {
    db("buylist")
        .where({
            member_id: memberId,
            paid: 1,
            received:0
            
        })
        .update({
            received: this.received
            
        })
        .then(function() {
            cb(null, this);
        }.bind(this))
        .catch(function(err) {
            console.log("PRODUCT UPDATED", err);
            cb(new GeneralErrors.Database());
        });
};

module.exports = Buy;
