angular
    .module('randomTiles')
    .controller('TilesArrangementController', function ($scope, _ArrangementGenerator_) {

        var ArrangementGenerator = _ArrangementGenerator_;

        $scope.shouldShowTilesLabels = false;
        const rows = 20;
        const columns = 11;

        $scope.generateNextArrangement = function (tileWidth, tileHeight, groutWidth) {
            $scope.isSwappingTilesInProgress = false;
            $scope.arrangement =
                ArrangementGenerator.newArrangementFor(rows, columns, tileWidth, tileHeight, groutWidth);
        };

    });
