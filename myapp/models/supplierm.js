//這是一個Member Model
var db = require('../libs/db'); //引入我們的sql builder
var GeneralErrors = require('../errors/GeneralErrors');



var SupplierMember = function(options) {
  this.id = options.id;
  this.name = options.name;
  this.password = options.password;
  this.account = options.account;
  this.phonenum = options.phonenum;
  this.address = options.address;
  this.photo = options.photo;
};

//Class Function
SupplierMember.get = function(memberId, cb) {
  db.select()
    .from('supplierm')
    .where({
      id : memberId
    })
    .map(function(row) {
      return new SupplierMember(row);
    })
    .then(function(memberList) {
      if(memberList.length) {
        cb(null, memberList[0]);
      } else {
        cb(new GeneralErrors.NotFound());
      }
    })
    .catch(function(err) {
      cb(err);
    })
}



SupplierMember.prototype.save = function (cb) {
  console.log('this.id'+this.id);
  if (this.id) {

    db("supplierm")
      .where({
        id : this.id
      })
      .update({
        name : this.name,
        account : this.account,
        password : this.password,
        phonenum : this.phonenum,
        address : this.address,
        photo : this.photo
      })
      .then(function() {
        cb(null, this);
      }.bind(this))
      .catch(function(err) {
        console.log("MEMBER UPDATED", err);
        cb(new GeneralErrors.Database());
      });
  } else {

    db("supplierm")
      .insert({
        name: this.name,
        account: this.account,
        password: this.password,
        phonenum : this.phonenum,
        address : this.address,
        photo : this.photo
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


SupplierMember.check = function(memberAccount, cb) {
  db.select()
    .from('supplierm')
    .where({
      account : memberAccount
    })
    .map(function(row) {
      return new SupplierMember(row);
    })
    .then(function(memberList) {
      if(memberList.length) {
        cb(null, memberList[0]);
      } else {
        cb(new GeneralErrors.NotFound());
      }
    })
    .catch(function(err) {
      cb(err);
    })
}

module.exports = SupplierMember;
