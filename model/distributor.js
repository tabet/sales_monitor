var mongoose = require('mongoose'),
    ObjectId = require('mongoose').Types.ObjectId,
    Schema = mongoose.Schema,
    customError = require('../lib/custom_errors'),
    utils = require('../lib/util');

var distributor = new Schema({
    name: String,
    type: String,
    address: String,
    phone: String
});

var distributorModel = mongoose.model('Distributors', distributor);

module.exports.addDistributor = function(data, callback){
    new distributorModel(data).save(function(err){
        if(err)
            return callback(new customError.Database("Failed to save record."),null);

        callback(null,{status: "Record has been inserted"});
    })
}

module.exports.getDistributors = function(query, callback){
    distributorModel.find(query,function(err, distributors){
        if (err)
            return callback(new customError.Database("Failed to get records."),null);

        callback(null, distributors);
    })
}

module.exports.getDistributor = function(id, callback){
    distributorModel.findOne({ _id:ObjectId.fromString(id) },function(err, distributor){
        if (err)
            return callback(new customError.Database("Failed to get record."),null);

        callback(null, distributor);
    })
}

