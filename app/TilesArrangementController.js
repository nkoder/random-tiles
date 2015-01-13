angular
    .module('randomTiles')
    .controller('TilesArrangementController', function ($scope, ArrangementGenerator) {

        $scope.generateNextArrangement = function (tileWidth, tileHeight, groutWidth, rows, columns) {
            $scope.arrangement = ArrangementGenerator
                .newArrangementFor(tileWidth, tileHeight, groutWidth, rows, columns);
        };

        $scope.shouldShowTilesLabels = false;

    });
