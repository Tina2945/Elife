var db = require('../libs/db');
var GeneralErrors = require('../errors/GeneralErrors');

var Record = function(options) {
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

Record.getAll = function(memberId, cb) {
    db.distinct("date")
        .select()
        .from("buylist")
        .where({
            member_id: memberId,
            paid: 1
        })
        .orderBy("date", "desc")
        .map(function(row) {
            //var result = row.date + " " + row.time;
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

Record.get = function(memberId, date, cb) {
    db.select()
        .from("buylist")
        .where({
            member_id: memberId,
            paid: 1,
            date: date
        })
        .map(function(row) {
            return new Record({
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
        .then(function(recordList) {
            if (recordList.length) {
                cb(null, recordList);
            } else {
                cb(null, new GeneralErrors.NotFound());
            }
        })
        .catch(function(err) {
            cb(err);
        });
};

module.exports = Record;
