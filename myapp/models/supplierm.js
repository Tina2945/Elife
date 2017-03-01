var db = require('../libs/db');
var GeneralErrors = require('../errors/GeneralErrors');

var SupplierMember = function(options) {
    this.id = options.id;
    this.name = options.name;
    this.phonenum = options.phonenum;
    this.address = options.address;
    //this.photo = options.photo;
    this.account = options.account;
    this.password = options.password;
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
                name: this.name,
                phonenum: this.phonenum,
                address: this.address,
                //photo: this.photo,
                account: this.account,
                password: this.password
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
                name: this.name,
                phonenum: this.phonenum,
                address: this.address,
                //photo: this.photo,
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
