describe('random-tiles', function() {

  beforeEach(function() {
    browser.get('index.html');
  });

  it("should show arrangement '<Canvas>'", function() {
    // given:

    // when:

    // then:
    expect(element(by.id('arrangement')).getTagName()).toBe("canvas");
  });

});
