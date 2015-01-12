describe('random-tiles', function() {

  beforeEach(function() {
    browser.get('index.html');
  });

  it('should show button for tiles arrangement generation', function() {
    // given:

    // when:

    // then:
    var generateButton = element(by.id('generate-arrangement'));
    expect(generateButton.getTagName()).toBe("button");
    expect(generateButton.getText()).toBe("Generate!");
  });

  it('should not show any arrangement if user does not click on "generate" button', function() {
    // given:

    // when:

    // then:
    expect(element(by.id('arrangement')).isPresent()).toBe(false);
  });

  it('should show generated arrangement if user clicks on "generate" button', function() {
    // given:

    // when:
    element(by.id('generate-arrangement')).click();

    // then:
    var arrangement = element(by.id('arrangement'));
    expect(arrangement.getTagName()).toBe("canvas");
  });

});
