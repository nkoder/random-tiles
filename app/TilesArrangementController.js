var randomTiles = angular.module('randomTiles');

randomTiles.controller('TilesArrangementController', ['$scope', function ($scope) {

    $scope.generateNextArrangement = function (tileWidth, tileHeight, rows, columns) {
        $scope.arrangement = new Arrangement(tileWidth, tileHeight, rows, columns);
    };

}]);
