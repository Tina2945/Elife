var db = require('../libs/db');
var GeneralErrors = require('../errors/GeneralErrors');

var Follow = function(options) {
    this.followId = options.followId;
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
                followId: row.follow_id,
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
            this.followId = insertedId;
            cb(null, this);
        }.bind(this))
        .catch(function(err) {
            console.log("FOLLOW INSERT", err);
            cb(new GeneralErrors.Database());
        });
};

Follow.prototype.delete = function(cb) {
    if (this.followId) {
        db("follow")
            .where({
                follow_id: this.followId
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
