var db = require('../libs/db');
var GeneralErrors = require('../errors/GeneralErrors');

var Follow = function(options) {
    this.id = options.id;
    this.memberId = options.memberId;
    this.supplierId = options.supplierId;
};

Follow.getAll = function(memberId, cb) {
    db.select()
        .from("follow")
        .where({
            member_id: memberId
        })
        .map(function(row) {
            return new Follow({
                id: row.id,
                memberId: row.member_id,
                supplierId: row.supplier_id
            });
        })
        .then(function(followList) {
            if (followList.length) {
                cb(null, followList);
            } else {
                cb(null, null);
            }
        })
        .catch(function(err) {
            console.log(err);
            cb(new GeneralErrors.Database());
        });
};

Follow.prototype.save = function(cb) {
    db("follow")
        .insert({
            member_id: this.memberId,
            supplier_id: this.supplierId
        })
        .then(function(result) {
            var insertedId = result[0];
            this.id = insertedId;
            cb(null, this);
        }.bind(this))
        .catch(function(err) {
            console.log("FOLLOW INSERT", err);
            cb(new GeneralErrors.Database());
        });
};

Follow.prototype.delete = function(cb) {
    if (this.id) {
        db("follow")
            .where({
                id: this.id
            })
            .del()
            .then(function() {
                cb(null, this);
            }.bind(this))
            .catch(function(err) {
                console.log("FOLLOW DELETED", err);
                cb(new GeneralErrors.Database());
            });
    }
};

module.exports = Follow;
