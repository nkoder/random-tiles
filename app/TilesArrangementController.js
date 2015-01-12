var randomTiles = angular.module('randomTiles');

randomTiles.controller('TilesArrangementController', ['$scope', function ($scope) {

    var wasArrangementGenerated = false;

    $scope.wasArrangementGenerated = function () {
        return wasArrangementGenerated;
    };

    $scope.generateArrangement = function() {
        wasArrangementGenerated = true;
    }
}]);