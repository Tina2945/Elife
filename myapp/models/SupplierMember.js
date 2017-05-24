var db = require('../libs/db');
var GeneralErrors = require('../errors/GeneralErrors');

var SupplierMember = function(options) {
    this.id = options.id;
    this.storeName = options.storeName;
    this.photo = options.photo;
    this.name = options.name;
    this.phonenum = options.phonenum;
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

SupplierMember.getAll = function(city, hometown, cb) {
    db.select()
        .from('supplierm')
        .leftOuterJoin('follow', 'supplierm.id', 'follow.supplier_id')
        .whereNull('follow.supplier_id')
        .where({
            city: city,
            hometown: hometown
        })
        .map(function(row) {
            return new SupplierMember(row);
        })
        .then(function(memberList) {
            if (memberList.length) {
                cb(null, memberList);
            } else {
                cb(null, null);
            }
        })
        .catch(function(err) {
            console.log(err);
            cb(new GeneralErrors.Database());
        })
};

SupplierMember.get = function(supplierId, cb) {
    db.select()
        .from("supplierm")
        .where({
            id: supplierId
        })
        .map(function(row) {
            return new SupplierMember(row);
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

SupplierMember.prototype.save = function(cb) {
    if (this.id) {
        db("supplierm")
            .where({
                id: this.id
            })
            .update({
                storeName: this.storeName,
                photo: this.photo,
                name: this.name,
                phonenum: this.phonenum,
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
                console.log("SUPPLIERMEMBER UPDATED", err);
                cb(new GeneralErrors.Database());
            });
    } else {
        db("supplierm")
            .insert({
                storeName: this.storeName,
                photo: this.photo,
                name: this.name,
                phonenum: this.phonenum,
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
                console.log("SUPPLIERMEMBER INSERT", err);
                cb(new GeneralErrors.Database());
            });
    }
};

SupplierMember.check = function(memberAccount, cb) {
    db.select()
        .from("supplierm")
        .where({
            account: memberAccount
        })
        .map(function(row) {
            return new SupplierMember(row);
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
        });
};

module.exports = SupplierMember;
