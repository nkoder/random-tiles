'use strict';

angular.module('randomTiles', [])
.controller('RandomTilesCtrl', ['$scope', function($scope) {

      $scope.init = function () {
        var rows = 10;
        var columns = 20;
        $scope.tilesRows = [];
        for (var row = 0; row < rows; row++) {
          $scope.tilesRows[row] = {
            tiles: []
          };
          for (var column = 0; column < columns; column++) {
            $scope.tilesRows[row].tiles[column] = {
              typeId: randomNumberFrom(1).to(10)
            }
          }
        }
      };

      function randomNumberFrom(start) {
        return {
          to: function(end) {
            return Math.floor((Math.random() * end) + start)
          }
        }
      }
}]);