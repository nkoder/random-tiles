angular
    .module('randomTiles')
    .controller('TilesArrangementController', function ($scope, _ArrangementGenerator_) {

        var ArrangementGenerator = _ArrangementGenerator_;

        $scope.shouldShowTilesLabels = false;
        $scope.rows = 20;
        $scope.columns = 9;

        $scope.generateNextArrangement = function (tileWidth, tileHeight, groutWidth) {
            $scope.isSwappingTilesInProgress = false;
            $scope.arrangement = ArrangementGenerator
                .newArrangementFor($scope.rows, $scope.columns, tileWidth, tileHeight, groutWidth);
        };

    });
