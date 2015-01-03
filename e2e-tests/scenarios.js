'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('randomTiles', function() {

  var ROWS_COUNT = 10;
  var COLUMNS_COUNT = 20;

  beforeEach(function() {
    browser.get('index.html');
  });

  it('should render proper number of table cells with .tile class', function() {
    element.all(by.css('td.tile')).then(function (items) {
      expect(items.length).toBe(ROWS_COUNT * COLUMNS_COUNT);
    });
  });

});
