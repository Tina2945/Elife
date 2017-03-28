var db = require('../libs/db');
var GeneralErrors = require('../errors/GeneralErrors');

var District = function(options) {
    this.id = options.id;
    this.city = options.city;
    this.town = options.town;
    this.hometown = options.hometown;
};

District.get = function(cb) {
    db.distinct('city', 'town')
        .select()
        .from("district")
        .map(function(row) {
            console.log(row);
            return new District({
                id: row.id,
                city: row.city,
                town: row.town,
                hometown: row.hometown
            });
        })
        .then(function(districtList) {
            if (districtList.length) {
                cb(null, districtList);
            } else {
                cb(null, new GeneralErrors.NotFound());
            }
        })
        .catch(function(err) {
            console.log(err);
            cb(new GeneralErrors.Database());
        });
};

module.exports = District;
