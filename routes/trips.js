/**
 * Created by Orlando on 1/7/2014.
 */
var q = require('q');
var tripRepository = require('../dib/trips');

exports.find = function(req, res)
{
    tripRepository.findTrip(req.query)
        .then(
        function(result){
            if (result)
            {
                res.send({'status' : 200, 'trips' : result});
            }
            else{
                res.send({'status' : 404, 'message' : 'Not found'});
            }

        },
        function(error)
        {
            if(error)
            {
                res.send({'status' : 404, 'message' : 'Not found'});
            }
        }
    )
};