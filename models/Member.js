var db = require('../libs/db');
var GeneralErrors = require('../errors/GeneralErrors');

var Member = function(options) {
    this.id = options.id;
    this.name = options.name;
    this.phonenum = options.phonenum;
    this.email = options.email;
    this.city = options.city;
    this.hometown = options.hometown;
    this.address = options.address;
    this.card1 = options.card1;
    this.card2 = options.card2;
    this.card3 = options.card3;
    this.card4 = options.card4;
    this.account = options.account;
    this.password = options.password;
};

Member.get = function(memberId, cb) {
    db.select()
        .from('member')
        .where({
            id: memberId
        })
        .map(function(row) {
            return new Member(row);
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

Member.prototype.save = function(cb) {
    if (this.id) {
        db("member")
            .where({
                id: this.id
            })
            .update({
                name: this.name,
                phonenum: this.phonenum,
                email: this.email,
                city: this.city,
                hometown: this.hometown,
                address: this.address,
                card1: this.card1,
                card2: this.card2,
                card3: this.card3,
                card4: this.card4
            })
            .then(function() {
                cb(null, this);
            }.bind(this))
            .catch(function(err) {
                console.log("MEMBER UPDATED", err);
                cb(new GeneralErrors.Database());
            });
    } else {
        db("member")
            .insert({
                name: this.name,
                phonenum: this.phonenum,
                email: this.email,
                city: this.city,
                hometown: this.hometown,
                address: this.address,
                card1: this.card1,
                card2: this.card2,
                card3: this.card3,
                card4: this.card4,
                account: this.account,
                password: this.password
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

Member.check = function(memberAccount, cb) {
    db.select()
        .from('member')
        .where({
            account: memberAccount
        })
        .map(function(row) {
            return new Member(row);
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

module.exports = Member;
