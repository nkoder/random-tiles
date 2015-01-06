describe('random-tiles', function() {

  beforeEach(function() {
    browser.get('index.html');
  });

  it('should show motivation phrase', function() {
    var phrase = element(by.css('p')).getText();

    expect(phrase).toBe('Let’s start from beginning and make things clean and test-driven');
  });

});
