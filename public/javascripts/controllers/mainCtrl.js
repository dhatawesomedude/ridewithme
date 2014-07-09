/**
 * Created by Orlando on 30/6/2014.
 */
angular.module('MainCtrl', [])
    .controller('MainController',['$scope', 'Trip', function($scope, Trip)
    {
    $scope.depature = "cyberjaya";
    $scope.destination = "Putrajaya";

    $scope.searchResults = Trip.findTrips({destination : $scope.destination, depature : $scope.depature});
    $scope.searchResults.$promise.then(function(result)
    {
        $scope.searchResults = result;

    }
    ,function(error)
        {
            console.log('error is' + error);
        });

    }
    ]);