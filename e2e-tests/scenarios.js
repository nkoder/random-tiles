'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('randomTiles', function() {

  var ROWS_COUNT = 24;
  var COLUMNS_COUNT = 9;

  beforeEach(function() {
    browser.get('index.html');
  });

  it('should render proper number of table rows', function() {
    element.all(by.css('tr')).then(function (rows) {
      expect(rows.length).toBe(ROWS_COUNT);
    });
  });

  it('should render proper number of table cells', function() {
    element.all(by.css('td')).then(function (cells) {
      expect(cells.length).toBe(ROWS_COUNT * COLUMNS_COUNT);
    });
  });

});
