describe('random-tiles', function() {

  beforeEach(function() {
    browser.get('index.html');
  });

  it("should show arrangement '<Canvas>'", function() {
    // given:

    // when:

    // then:
    expect(element(by.id('arrangement')).getTagName()).toEqual("canvas");
  });

  it("should generate arrangement", function() {
    // given:
    const tileWidth = 98;
    const tileHeight = 98;
    const groutWidth = 2;
    const rows = 15;
    const columns = 10;
    setRowsCountTo(rows);
    setColumnsCountTo(columns);

    // when:
    generateArrangement();

    // then:
    var arrangement = element(by.id('arrangement'));
    expect(arrangement.getTagName()).toEqual("canvas");
    expect(arrangement.getAttribute("width")).toEqual((columns * (tileWidth + groutWidth)).toString());
    expect(arrangement.getAttribute("height")).toEqual((rows * (tileHeight  +groutWidth)).toString());
  });

  it("should generate arrangement with parameters different than for previous one", function () {
    // given:
    const tileWidth = 98;
    const tileHeight = 98;
    const groutWidth = 2;
    const oldRows = 15;
    const oldColumns = 10;
    const newRows = 16;
    const newColumns = 11;
    setRowsCountTo(oldRows);
    setColumnsCountTo(oldColumns);
    generateArrangement();

    // when:
    setRowsCountTo(newRows);
    setColumnsCountTo(newColumns);
    generateArrangement();

    // then:
    var arrangement = element(by.id('arrangement'));
    expect(arrangement.getAttribute("width")).toEqual((newColumns * (tileWidth + groutWidth)).toString());
    expect(arrangement.getAttribute("height")).toEqual((newRows * (tileHeight + groutWidth)).toString());
  });

  it("should not fail when toggling tiles' labels visibility", function () {
    // given:
    generateArrangement();

    // when:
    toggleLabelsVisibility();
    toggleLabelsVisibility();
    toggleLabelsVisibility();

    // then:
  });

  function setRowsCountTo(rowsCount) {
    setValuesOfElementWithId('rows-count').toValue(rowsCount);
  }

  function setColumnsCountTo(columnsCount) {
    setValuesOfElementWithId('columns-count').toValue(columnsCount);
  }

  function setValuesOfElementWithId(id) {
    var foundElement = element(by.id(id));
    return {
      toValue: function (value) {
        foundElement.clear();
        foundElement.sendKeys(value.toString());
      }
    }
  }

  function generateArrangement() {
    element(by.id('generate-arrangement')).click();
  }

  function toggleLabelsVisibility() {
    element(by.id('labels-visibility')).click();
  }

});
