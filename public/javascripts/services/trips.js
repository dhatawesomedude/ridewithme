angular.module('TripService', ['ngResource'])
    .config(['$resourceProvider', function($resourceProvider){
    // Don't strip trailing slashes from calculated URLs
    //$resourceProvider.default.stripTrailingSlashes = false;
}])
    .factory('Trip', ['$resource',
        function($resource){
            return $resource('/trips/:verb', {verb:'find', depature : 'cyberjaya', destination : 'putrajaya'}, {
                findTrips: {method:'POST', params:{}, isArray:false}
            });
        }]);





