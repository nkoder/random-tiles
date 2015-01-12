describe('TilesArrangementDirective', function () {

    var $compile, $rootScope;

    beforeEach(module('randomTiles'));

    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    it("should be replaced by 'canvas' HTML element", function () {
        // given:

        // when:
        var element = compileDirective();

        // then:
        expect(element.prop('tagName').toLowerCase()).toBe('canvas');
    });

    function compileDirective() {
        var element = $compile('<tiles-arrangement></tiles-arrangement>')($rootScope);
        $rootScope.$digest();
        return element;
    }

});