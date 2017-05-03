var db = require('../libs/db');
var GeneralErrors = require('../errors/GeneralErrors');

var Record = function(options) {
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

Record.getAll = function(memberId, cb) {
    db.distinct("date", "time")
        .select()
        .from("buylist")
        .where({
            member_id: memberId,
            paid: 1
        })
        .orderBy("date", "desc")
        .orderBy("time", "desc")
        .map(function(row) {
            var result = row.date + " " + row.time;
            return result;
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

Record.get = function(memberId, date, time, cb) {
    db.select()
        .from("buylist")
        .where({
            member_id: memberId,
            paid: 1,
            date: date,
            time: time
        })
        .map(function(row) {
            return new Record({
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

Record.sum = function(memberId, date, time, cb) {
    db("buylist")
        .sum("total as sum")
        .where({
            member_id: memberId,
            paid: 1,
            date: date,
            time: time
        })
        .map(function(row) {
            return row.sum;
        })
        .then(function(sum) {
            cb(null, sum);
        })
        .catch(function(err) {
            console.log(err);
            cb(new GeneralErrors.Database());
        });
};

module.exports = Record;
