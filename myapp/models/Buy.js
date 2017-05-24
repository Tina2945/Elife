var db = require('../libs/db');
var GeneralErrors = require('../errors/GeneralErrors');

var Buy = function(options) {
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

//取得所有訂單
Buy.getAll = function(cb) {
    db.groupBy("member_id")
        .groupBy("date")
        .groupBy("time")
        .select()
        .from("buylist")
        .where({
            paid: 1,
            status: 0
        })
        .orderBy("date", "desc")
        .orderBy("time", "desc")
        .map(function(row) {
            return new Buy({
                memberId: row.member_id,
                date: row.date,
                time: row.time
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

//取得所有訂單詳情
Buy.get = function(memberId, date, time, cb) {
    db.select()
        .from("buylist")
        .where({
            member_id: memberId,
            paid: 1,
            date: date,
            time: time,
            status: 0
        })
        .orderBy("supplier_id")
        .map(function(row) {
            return new Buy({
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

//取得我的訂單
Buy.getMine = function(thirdId, cb) {
    db.groupBy("member_id")
        .groupBy("date")
        .groupBy("time")
        .select()
        .from("buylist")
        .where({
            status: 1,
            third_id: thirdId,
            received: 0
        })
        .orderBy("date", "desc")
        .orderBy("time", "desc")
        .map(function(row) {
            return new Buy({
                memberId: row.member_id,
                date: row.date,
                time: row.time
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

//取得我的訂單詳情
Buy.getOrder = function(memberId, date, time, thirdId, cb) {
    db.select()
        .from("buylist")
        .where({
            member_id: memberId,
            date: date,
            time: time,
            status: 1,
            third_id: thirdId,
            received: 0
        })
        .orderBy("supplier_id")
        .map(function(row) {
            return new Buy({
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

//取得歷史紀錄
Buy.getHistory = function(cb) {
    db.groupBy("member_id")
        .groupBy("date")
        .groupBy("time")
        .select()
        .from("buylist")
        .where({
            status: 1
        })
        .orderBy("date", "desc")
        .orderBy("time", "desc")
        .map(function(row) {
            return new Buy({
                memberId: row.member_id,
                date: row.date,
                time: row.time,
                thirdId: row.third_id,
                received: row.received
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

//取得歷史紀錄詳情
Buy.getDetail = function(memberId, date, time, cb) {
    db.select()
        .from("buylist")
        .where({
            member_id: memberId,
            date: date,
            time: time,
            status: 1
        })
        .orderBy("supplier_id")
        .map(function(row) {
            return new Buy({
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

//更新
Buy.prototype.update = function(id, cb) {
    db("buylist")
        .whereIn('id', id)
        .update({
            status: this.status,
            third_id: this.thirdId,
            received: this.received
        })
        .then(function() {
            cb(null, this);
        }.bind(this))
        .catch(function(err) {
            console.log("BUY UPDATED", err);
            cb(new GeneralErrors.Database());
        });
};

module.exports = Buy;
