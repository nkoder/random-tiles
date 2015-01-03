'use strict';

angular.module('randomTiles', [])
.controller('RandomTilesCtrl', ['$scope', '$window', function($scope, $window) {

      var LONG_DISTANCE = 8;
      var SHORT_DISTANCE = 1;
      var MAX_CHANCE = 12;

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
            var typeId = randomTileTypeIdFor(row, column);
            $scope.tilesRows[row].tiles[column] = {
              typeId: typeId
            };
            if (typeId.familyName != "error") {
              useTileOf(typeId);
            }
          }
        }
        reportLeftTiles();
      };

      function reportLeftTiles() {
        var report = "";
        report += ("Pozostałe płytki:\n");
        $scope.tilesFamilies.forEach(function(family) {
          family.groups.forEach(function (group) {
            report += group.amount + " x " + family.name + "-"  + group.type + "\n";
          });
        });
        $window.alert(report);
      }

      function useTileOf(typeId) {
        var family = familyWithName(typeId.familyName);
        var group = groupOfType(typeId.type, family);
        group.amount--;
        if (group.amount <= 0) {
          removeGroup(family, typeId.type);
        }
      }

      function removeGroup(family, type) {
        var indexToRemove = -1;
        for (var index = 0; index < family.groups.length; index++) {
          if (family.groups[index].type === type) {
            indexToRemove = index;
          }
        }
        family.groups = family.groups.slice(0, indexToRemove).concat(family.groups.slice(indexToRemove + 1));
      }

      function randomTileTypeIdFor(row, column) {
        var accumulation = accumulateFamiliesInNeighbourhoodOf(row, column);
        var options = optionsFor(accumulation);
        if (options.length === 0) {
          return {
            familyName: "error",
            type: "error"
          };
        }
        var luckyIndex = randomNumberFrom(0).to(options.length-1);
        var familyName = options[luckyIndex];
        var family = familyWithName(familyName);
        var luckyTypeIndex = randomNumberFrom(0).to(family.groups.length-1);
        var type = family.groups[luckyTypeIndex].type;
        return typeIdFrom(familyName, type);
      }

      function optionsFor(accumulation) {
        var options = [];
        $scope.tilesFamilies.forEach(function (family) {
          var previousOccurrences = accumulation[family.name];
          var maxIndex = MAX_CHANCE < previousOccurrences
              ? 0
              : (MAX_CHANCE - previousOccurrences) * (MAX_CHANCE - previousOccurrences);
            for (var index = 1; index <= maxIndex; index++) {
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
        updateResult(result, anchorRow, anchorColumn, LONG_DISTANCE, 1);
        updateResult(result, anchorRow, anchorColumn, SHORT_DISTANCE, 999);
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

      function randomNumberFrom(min) {
        return {
          to: function(max) {
            return Math.floor((Math.random() * (max - min + 1)) + min)
          }
        }
      }

      function typeIdFrom(familyName, type) {
        return {
          familyName: familyName,
          type: type
        };
      }

      function familyWithName(familyName) {
        for (var index = 0; index < $scope.tilesFamilies.length; index++) {
          if ($scope.tilesFamilies[index].name === familyName) {
            return $scope.tilesFamilies[index];
          }
        }
      }

      function groupOfType(type, family) {
        for (var index = 0; index < family.groups.length; index++) {
          if (family.groups[index].type === type) {
            return family.groups[index];
          }
        }
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