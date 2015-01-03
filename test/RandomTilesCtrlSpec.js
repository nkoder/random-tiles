'use strict';

describe('RandomTiles', function() {

  var ROWS_COUNT = 20;
  var COLUMNS_COUNT = 10;

  var scope;

  beforeEach(module('randomTiles'));

  beforeEach(inject(function ($rootScope, $controller) {
    scope = $rootScope.$new();
    $controller('RandomTilesCtrl', {
      $scope: scope
    });
  }));

  it('should provide tiles for ' + ROWS_COUNT + ' rows and ' + COLUMNS_COUNT + ' columns', function() {
    scope.init();

    for (var row = 0; row < ROWS_COUNT; row++) {
      expect(tilesAtRow(row)).toBeDefined();
      for (var column = 0; column < COLUMNS_COUNT; column++) {
        expect(tilesAtRow(row).tiles[column]).toBeDefined();
      }
      expect(tilesAtRow(row).tiles[COLUMNS_COUNT]).not.toBeDefined();
    }
    expect(tilesAtRow(row)).not.toBeDefined();
  });

  function tilesAtRow(row) {
    return scope.tilesRows[row];
  }

});