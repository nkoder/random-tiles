var randomTiles = angular.module('randomTiles');

randomTiles.directive('tilesArrangement', function () {
    return {
        restrict: 'E',
        replace: true,
        template: '<canvas id="arrangement"></canvas>'
    }
});


