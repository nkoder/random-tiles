describe('TilesArrangementDirective', function () {

    var $compile;
    var scope;

    beforeEach(module('randomTiles'));

    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        scope = _$rootScope_.$new();
    }));

    it("should be replaced by 'canvas' HTML element", function () {
        // given:

        // when:
        var element = compileDirective();

        // then:
        expect(element.prop("tagName").toLowerCase()).toBe("canvas");
        expect(element.prop("id")).toBe("arrangement");
    });

    function compileDirective() {
        var element = $compile('<tiles-arrangement></tiles-arrangement>')(scope);
        scope.$digest();
        return element;
    }

});