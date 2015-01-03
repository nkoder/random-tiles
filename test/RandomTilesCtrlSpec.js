'use strict';

describe('RandomTiles', function() {

  var scope;

  beforeEach(module('randomTiles'));

  beforeEach(inject(function ($rootScope, $controller) {
    scope = $rootScope.$new();
    $controller('RandomTilesCtrl', {
      $scope: scope
    });
  }));

  it('should provide proper number tiles of 20x20 tiles for given room size', function() {
    var roomWidth = 61;
    var roomLength = 39;
    scope.generateTilesArrangement(roomWidth, roomLength);
    var expectedColumns = 4
    var expectedRows = 2

    for (var row = 0; row < expectedRows; row++) {
      expect(tilesAtRow(row)).toBeDefined();
      for (var column = 0; column < expectedColumns; column++) {
        expect(tilesAtRow(row).tiles[column]).toBeDefined();
      }
      expect(tilesAtRow(row).tiles[expectedColumns]).not.toBeDefined();
    }
    expect(tilesAtRow(expectedRows)).not.toBeDefined();
  });

  function tilesAtRow(row) {
    return scope.tilesRows[row];
  }

});