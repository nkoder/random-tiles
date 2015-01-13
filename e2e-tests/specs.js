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

    // when:
    element(by.id('generate-arrangement')).click();

    // then:
    var arrangement = element(by.id('arrangement'));
    expect(arrangement.getTagName()).toEqual("canvas");
    expect(arrangement.getAttribute("width")).toEqual((columns * (tileWidth + groutWidth)).toString());
    expect(arrangement.getAttribute("height")).toEqual((rows * (tileHeight  +groutWidth)).toString());
  });

});
