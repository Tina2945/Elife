var db = require('../libs/db'); //引入我們的sql builder
var GeneralErrors = require('../errors/GeneralErrors');

var Product = function(options) {
    this.id = options.id;
    this.name = options.name;
    this.price = options.price;
    this.description = options.description;
    this.photo = options.photo;
    this.supplierId = options.supplierId;
};

Product.getAll = function(cb) {
    db.select()
        .from("product")
        .map(function(row) {
            return new Product({
                id: row.id,
                name: row.name,
                price: row.price,
                description: row.description,
                photo: row.photo,
                supplierId: row.supplier_id
            });
        })
        .then(function(productList) {
            cb(null, productList);
        })
        .catch(function(err) {
            cb(new GeneralErrors.Database());
        });
};

Product.get = function(productId, cb) {
    db.select()
        .from("product")
        .where({
            id: productId
        })
        .map(function(row) {
            return new Product({
                id: row.id,
                name: row.name,
                price: row.price,
                description: row.description,
                photo: row.photo,
                supplierId: row.supplier_id
            });
        })
        .then(function(productList) {
            if (productList.length) {
                cb(null, productList[0]);
            } else {
                cb(null, new GeneralErrors.NotFound());
            }
        })
        .catch(function(err) {
            console.log(err);
            cb(new GeneralErrors.Database());
        });
};

Product.prototype.save = function(cb) {
    if (this.id) {
        db("product")
            .where({
                id: this.id
            })
            .update({
                name: this.name,
                price: this.price,
                description: this.description,
                photo: this.photo
            })
            .then(function() {
                cb(null, this);
            }.bind(this))
            .catch(function(err) {
                console.log("PRODUCT UPDATED", err);
                cb(new GeneralErrors.Database());
            });
    } else {
        db("product")
            .insert({
                name: this.name,
                price: this.price,
                description: this.description,
                photo: this.photo,
                supplier_id: this.supplierId
            })
            .then(function(result) {
                var insertedId = result[0];
                this.id = insertedId;
                cb(null, this);
            }.bind(this))
            .catch(function(err) {
                console.log("PRODUCT INSERT", err);
                cb(new GeneralErrors.Database());
            });
    }
};

module.exports = Product;
