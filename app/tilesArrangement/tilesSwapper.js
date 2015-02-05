angular.module('tilesArrangement.tilesSwapper', [])

    .factory('TilesSwapper', function () {

        var scope;
        var sourceCell;
        var callbackOnSwapBegin, callbackOnSwapFinish;

        function attachTo($scope) {
            scope = $scope;
        }

        function clickedTileIn(cell) {
            if (!!scope.isSwappingTilesInProgress) {
                stopSwappingTilesIn(cell);
            } else {
                startSwappingTilesIn(cell);
            }
        }

        function startSwappingTilesIn(cell) {
            scope.isSwappingTilesInProgress = true;
            sourceCell = cell;
            if (!!callbackOnSwapBegin) {
                callbackOnSwapBegin(cell);
            }
        }

        function stopSwappingTilesIn(cell) {
            scope.isSwappingTilesInProgress = false;
            if (!!callbackOnSwapFinish) {
                callbackOnSwapFinish(sourceCell, cell);
            }
            sourceCell = undefined;
        }

        function onSwapBegin(callback) {
            callbackOnSwapBegin = callback;
        }

        function onSwapFinish(callback) {
            callbackOnSwapFinish = callback;
        }

        return {
            attachTo: attachTo,
            clickedTileIn: clickedTileIn,
            onSwapBegin: onSwapBegin,
            onSwapFinish: onSwapFinish
        }
    });