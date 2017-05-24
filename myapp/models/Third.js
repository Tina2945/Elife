var db = require('../libs/db');
var GeneralErrors = require('../errors/GeneralErrors');

var Third = function(options) {
    this.id = options.id;
    this.name = options.name;
    this.phonenum = options.phonenum;
    this.account = options.account;
    this.password = options.password;
};

Third.get = function(memberId, cb) {
    db.select()
        .from('thirdm')
        .where({
            id: memberId
        })
        .map(function(row) {
            return new Third(row);
        })
        .then(function(memberList) {
            if (memberList.length) {
                cb(null, memberList[0]);
            } else {
                cb(new GeneralErrors.NotFound());
            }
        })
        .catch(function(err) {
            cb(err);
        })
};

Third.prototype.save = function(cb) {
    if (this.id) {
        db("thirdm")
            .where({
                id: this.id
            })
            .update({
                name: this.name,
                phonenum: this.phonenum,
                account: this.account,
                password: this.password
            })
            .then(function() {
                cb(null, this);
            }.bind(this))
            .catch(function(err) {
                console.log("THIRD UPDATED", err);
                cb(new GeneralErrors.Database());
            });
    } else {
        db("thirdm")
            .insert({
                name: this.name,
                phonenum: this.phonenum,
                account: this.account,
                password: this.password
            })
            .then(function(result) {
                var insertedId = result[0];
                this.id = insertedId;
                cb(null, this);
            }.bind(this))
            .catch(function(err) {
                console.log("THIRD INSERT", err);
                cb(new GeneralErrors.Database());
            });
    }
};

Third.check = function(memberAccount, cb) {
    db.select()
        .from('thirdm')
        .where({
            account: memberAccount
        })
        .map(function(row) {
            return new Third(row);
        })
        .then(function(memberList) {
            if (memberList.length) {
                cb(null, memberList[0]);
            } else {
                cb(new GeneralErrors.NotFound());
            }
        })
        .catch(function(err) {
            cb(err);
        })
};

module.exports = Third;
