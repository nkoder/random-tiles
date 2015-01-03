'use strict';

angular.module('randomTiles', [])
.controller('RandomTilesCtrl', ['$scope', function($scope) {

      var tileSize = 20;

      $scope.generateTilesArrangement = function (roomWidth, roomLength) {
        initTilesFamilies();
        var rows = Math.ceil(roomLength / tileSize);
        var columns = Math.ceil(roomWidth / tileSize);
        $scope.tilesRows = [];
        for (var row = 0; row < rows; row++) {
          $scope.tilesRows[row] = {
            tiles: []
          };
          for (var column = 0; column < columns; column++) {
            $scope.tilesRows[row].tiles[column] = {
              typeId: randomTileTypeIdFor(row, column)
            }
          }
        }
      };

      function randomTileTypeIdFor(row, column) {
        var accumulation = accumulateFamiliesInNeighbourhoodOf(row, column);
        var options = optionsFor(accumulation);
        console.log("options for (" + row + "," + column + ") are " + options);
        var luckyIndex = randomNumberFrom(1).to(options.length) - 1;
        var familyName = options[luckyIndex];
        var type = 1;
        return typeIdFrom(familyName, type);
      }

      function optionsFor(accumulation) {
        var maxNumber = 20;
        var options = [];
        $scope.tilesFamilies.forEach(function (family) {
          var previousOccurrences = accumulation[family.name];
          for (var index = 1; index <= (maxNumber - previousOccurrences); index++) {
            options.push(family .name);
          }
        });
        return options;
      }

      function accumulateFamiliesInNeighbourhoodOf(anchorRow, anchorColumn) {
        var result = {};
        allTypeIds().forEach(function (typeId) {
          result[typeId.familyName] = 0;
        });
        updateResult(result, anchorRow, anchorColumn, 6, 1);
        updateResult(result, anchorRow, anchorColumn, 2, 999);
        return result;
      }

      function updateResult(result, anchorRow, anchorColumn, distance, weight) {
        for (var row = anchorRow - distance; row <= anchorRow + distance; row++) {
          for (var column = anchorColumn - distance; column <= anchorColumn + distance; column++) {
            if (row >=0
                && column >= 0
                && (row != anchorRow || column != anchorColumn)
                && (typeof $scope.tilesRows[row] !== 'undefined')
                && (typeof $scope.tilesRows[row].tiles[column] !== 'undefined')) {
              var typeId = typeIdIn(row, column);
              result[typeId.familyName] = result[typeId.familyName] + weight;
            }
          }
        }
      }

      function allTypeIds() {
        var result = [];
        $scope.tilesFamilies.forEach(function(family) {
          family.groups.forEach(function (group) {
            result.push(typeIdFrom(family.name, group.type));
          });
        });
        return result;
      }

      function typeIdIn(row, column) {
        return $scope.tilesRows[row].tiles[column].typeId;
      }

      function randomNumberFrom(start) {
        return {
          to: function(end) {
            return Math.floor((Math.random() * end) + start)
          }
        }
      }

      function typeIdFrom(familyName, type) {
        return {
          familyName: familyName,
          type: type
        };
      }

      function initTilesFamilies() {
        $scope.tilesFamilies = [
          {
            name: 'barcelona',
            groups: [
              { type: 1, amount: 5},
              { type: 2, amount: 8}
            ]
          },
          {
            name: 'celowniki',
            groups: [
              { type: 1, amount: 5},
              { type: 2, amount: 6}
            ]
          },
          {
            name: 'kawa',
            groups: [
              { type: 1, amount: 5},
              { type: 2, amount: 4},
              { type: 3, amount: 5}
            ]
          },
          {
            name: 'kleks',
            groups: [
              { type: 1, amount: 2},
              { type: 2, amount: 3},
              { type: 3, amount: 6}
            ]
          },
          {
            name: 'kolibry',
            groups: [
              { type: 1, amount: 5},
              { type: 2, amount: 5},
              { type: 3, amount: 5},
              { type: 4, amount: 8}
            ]
          },
          {
            name: 'kotki',
            groups: [
              { type: 1, amount: 5},
              { type: 2, amount: 5},
              { type: 3, amount: 3},
              { type: 4, amount: 6}
            ]
          },
          {
            name: 'kwiatki',
            groups: [
              { type: 1, amount: 6},
              { type: 2, amount: 6},
              { type: 3, amount: 4}
            ]
          },
          {
            name: 'mandarynka',
            groups: [
              { type: 1, amount: 7},
              { type: 2, amount: 6},
              { type: 3, amount: 6}
            ]
          },
          {
            name: 'maziaje',
            groups: [
              { type: 1, amount: 25}
            ]
          },
          {
            name: 'paproc',
            groups: [
              { type: 1, amount: 8},
              { type: 2, amount: 6},
              { type: 3, amount: 6},
              { type: 4, amount: 7}
            ]
          },
          {
            name: 'piksele',
            groups: [
              { type: 1, amount: 4},
              { type: 2, amount: 5},
              { type: 3, amount: 6}
            ]
          },
          {
            name: 'szachownica',
            groups: [
              { type: 1, amount: 6}
            ]
          }
        ];
      }
}]);