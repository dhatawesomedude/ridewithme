/**
 * Created by Orlando on 1/7/2014.
 */
var mongoose = require('mongoose');
var Q = require('q');
var model = require('../models/trips');

var nSchema = mongoose.Schema({
    tid         : String,
    depature    : String,
    destination : String
});

var nModel = mongoose.model('trips', nSchema);

function entityToModel(entity)
{
    if (!entity) return null;

    var newModel = new model();
    newModel.tid = entity.tid;
    newModel.depature = entity.depature;
    newModel.destination = entity.destination;

    return newModel;
}
function createOptions(params) {
    var options = {
        'limit': params.limit || 50,
        'skip': params.offset || 0
    };

    return options;
}

var databaseQuery = exports.databaseQuery = function(searchParams, options)
{
    var d= Q.defer();
    nModel.find(searchParams, null, options, function(err, results)
    {
        if (err)
        {
            d.reject(err);
        }
        else
            d.resolve(results);
    });
    return d.promise;
};

exports.findTrip = function(params){
    var d= Q.defer();
    var options = createOptions(params);

    this.databaseQuery({destination : params.destination, depature : params.depature}, options).then(function(results){

        var trips = [];
        results.forEach(function(obj)
        {
            trips.push(entityToModel(obj));
        });
        d.resolve(trips);
    }
    , function(error)
        {
            d.reject(error);
        }
    );
    return d.promise;
};