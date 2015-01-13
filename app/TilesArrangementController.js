angular
    .module('randomTiles')
    .controller('TilesArrangementController', function ($scope, _ArrangementGenerator_) {

        var ArrangementGenerator = _ArrangementGenerator_;

        $scope.shouldShowTilesLabels = false;
        $scope.rows = 15;
        $scope.columns = 10;

        $scope.generateNextArrangement = function (tileWidth, tileHeight, groutWidth) {
            $scope.arrangement = ArrangementGenerator
                .newArrangementFor(tileWidth, tileHeight, groutWidth, $scope.rows, $scope.columns);
        };

    });
