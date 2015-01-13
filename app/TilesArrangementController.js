var randomTiles = angular.module('randomTiles');

randomTiles.controller('TilesArrangementController', ['$scope', function ($scope) {

    $scope.generateNextArrangement = function (rows, columns) {
        $scope.arrangement = new Arrangement(rows, columns);
    };

    function Arrangement(rows, columns) {

        var tiles = [];
        _.range(1, rows + 1).forEach(function (row) {
         _.range(1, columns + 1).forEach(function (column) {
             tiles.push(new Tile(row, column));
         });
        });

        return {
            tiles: tiles
        }

    }

    function Tile(row, column) {

        function nextName() {
            var randomNumber = Math.random();
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
            name: nextName(),
            width: 200,
            height: 200,
            cell: {
                row: row,
                column: column
            }
        }

    }

}]);
