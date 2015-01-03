'use strict';

angular.module('randomTiles', [])
.controller('RandomTilesCtrl', ['$scope', function($scope) {

      $scope.init = function () {
        initTilesFamilies();
        var rows = 20;
        var columns = 10;
        $scope.tilesRows = [];
        for (var row = 0; row < rows; row++) {
          $scope.tilesRows[row] = {
            tiles: []
          };
          for (var column = 0; column < columns; column++) {
            $scope.tilesRows[row].tiles[column] = {
              typeId: randomTileTypeId()
            }
          }
        }
      };

      function randomTileTypeId() {
        var family = $scope.tilesFamilies[randomNumberFrom(1).to($scope.tilesFamilies.length) - 1];
        var group = family.groups[randomNumberFrom(1).to(family.groups.length) - 1];
        return typeIdFrom(family.name, group.type);

      }

      function randomNumberFrom(start) {
        return {
          to: function(end) {
            return Math.floor((Math.random() * end) + start)
          }
        }
      }

      function typeIdFrom(familyName, type) {
        return familyName + '-' + type;
      }

      function initTilesFamilies() {
        $scope.tilesFamilies = [
          {
            name: 'celowniki',
            groups: [
              {
                type: 1,
                amount: 5
              },
              {
                type: 2,
                amount: 6
              }
            ]
          },
          {
            name: 'kolibry',
            groups: [
              {
                type: 1,
                amount: 5
              },
              {
                type: 2,
                amount: 5
              },
              {
                type: 3,
                amount: 5
              },
              {
                type: 4,
                amount: 8
              }
            ]
          }
        ];
      }
}]);