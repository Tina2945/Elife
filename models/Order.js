var db = require('../libs/db');
var GeneralErrors = require('../errors/GeneralErrors');

var Order = function(options) {
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

Order.getAll = function(supplierId, cb) {
    db.distinct("date")
        .select()
        .from("buylist")
        .where({
            supplier_id: supplierId,
            paid: 1,
            received: 0
        })
        .orderBy("date", "desc")
        .map(function(row) {
            return row.date;
        })
        .then(function(dateList) {
            if (dateList.length) {
                cb(null, dateList);
            } else {
                cb(null, null);
            }
        })
        .catch(function(err) {
            console.log(err);
            cb(new GeneralErrors.Database());
        });
};

Order.get = function(supplierId, date, cb) {
    db.select()
        .from("buylist")
        .where({
            supplier_id: supplierId,
            paid: 1,
            received: 0,
            date: date
        })
        .orderBy("time", "desc")
        .map(function(row) {
            return new Order({
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
        .then(function(orderList) {
            if (orderList.length) {
                cb(null, orderList);
            } else {
                cb(null, new GeneralErrors.NotFound());
            }
        })
        .catch(function(err) {
            cb(err);
        });
};

module.exports = Order;
