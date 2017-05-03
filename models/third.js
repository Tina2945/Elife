//這是一個Member Model
var db = require('../libs/db'); //引入我們的sql builder
var GeneralErrors = require('../errors/GeneralErrors');



var Member = function(options) {
  this.id = options.id;
  this.name = options.name;
  this.password = options.password;
  this.account = options.account;
  this.phonenum = options.phonenum;
  this.address = options.address;
};

//Class Function
Member.get = function(memberId, cb) {
  db.select()
    .from('member')
    .where({
      id : memberId
    })
    .map(function(row) {
      return new Member(row);
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



Member.prototype.save = function (cb) {
  console.log('this.id'+this.id);
  if (this.id) {

    db("member")
      .where({
        id : this.id
      })
      .update({
        name : this.name,
        account : this.account,
        password : this.password,
        phonenum : this.phonenum,
        address : this.address
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
        account: this.account,
        password: this.password,
        phonenum : this.phonenum,
        address : this.address
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
      account : memberAccount
    })
    .map(function(row) {
      return new Member(row);
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

module.exports = Member;
