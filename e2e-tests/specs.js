describe('random-tiles', function() {

  beforeEach(function() {
    browser.get('index.html');
  });

  it("should generate arrangement", function() {
    // given:
    const tileWidth = 98;
    const tileHeight = 98;
    const groutWidth = 2;
    const rows = 20;
    const columns = 11;

    // when:
    generateArrangement();

    // then:
    expect(generatedArrangement().getTagName()).toEqual("canvas");
    expect(generatedArrangement().getAttribute("width")).toEqual((columns * (tileWidth + groutWidth)).toString());
    expect(generatedArrangement().getAttribute("height")).toEqual((rows * (tileHeight + groutWidth)).toString());
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

  function generateArrangement() {
    return element(by.id('generate-arrangement')).click();
  }

  function generatedArrangement() {
    return element(by.id('arrangement'));
  }

  function toggleLabelsVisibility() {
    element(by.id('labels-visibility')).click();
  }

});
