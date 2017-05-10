//這是一個Member Model
var db = require('../libs/db'); //引入我們的sql builder
var GeneralErrors = require('../errors/GeneralErrors');

var Third = function(options) {
    this.id = options.id;
    this.name = options.name;
    this.password = options.password;
    this.account = options.account;
    this.phonenum = options.phonenum;
};

//Class Function
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
                account: this.account,
                password: this.password,
                phonenum: this.phonenum
            })
            .then(function() {
                cb(null, this);
            }.bind(this))
            .catch(function(err) {
                console.log("MEMBER UPDATED", err);
                cb(new GeneralErrors.Database());
            });
    } else {
        db("thirdm")
            .insert({
                name: this.name,
                account: this.account,
                password: this.password,
                phonenum: this.phonenum
            })
            .then(function(result) {
                var insertedId = result[0];
                this.id = insertedId;
                cb(null, this);
            }.bind(this))
            .catch(function(err) {
                console.log("MEMBER INSERT", err);
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
}

module.exports = Third;
