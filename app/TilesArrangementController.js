var randomTiles = angular.module('randomTiles');

randomTiles.controller('TilesArrangementController', ['$scope', function ($scope) {

    $scope.generateNextArrangement = function () {
        $scope.arrangement = new Arrangement();
    };

    function Arrangement() {

        function nextTile(randomNumber) {
            if (randomNumber < 0.5) {
                if (randomNumber < 0.25) {
                    return "barcelona-1";
                }
                return "celowniki-1"
            }
            if (randomNumber < 0.75) {
                return "kleks-1";
            }
            return "maziaje-1";
        }

        return {
            tile: nextTile(Math.random())
        }
    }

}]);
