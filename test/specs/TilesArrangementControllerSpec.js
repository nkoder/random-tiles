describe('TilesArrangementController', function () {

    var $rootScope, $controller;
    var ArrangementGenerator;

    beforeEach(module('randomTiles'));

    beforeEach(inject(function (_$rootScope_, _$controller_, _ArrangementGenerator_) {
        $rootScope = _$rootScope_;
        $controller = _$controller_;
        ArrangementGenerator = _ArrangementGenerator_;
    }));

    it("should not generate arrangement on init", function () {
        // given:
        var scope = scopeAttachedToController();

        // when:

        // then:
        expect(scope.arrangement).not.toBeDefined();
    });

    it("should generate next arrangement", function () {
        // given:
        const rows = 2;
        const columns = 3;
        const tileWidth = 6;
        const tileHeight = 7;
        const groutWidth = 7;
        var scope = scopeAttachedToController();
        spyOn(ArrangementGenerator, "newArrangementFor").and.returnValue("new arrangement");

        // when:
        scope.generateNextArrangement(tileWidth, tileHeight, groutWidth, rows, columns);

        // then:
        expect(ArrangementGenerator.newArrangementFor)
            .toHaveBeenCalledWith(tileWidth, tileHeight, groutWidth, rows, columns);
        expect(scope.arrangement).toEqual("new arrangement");
    });

    function scopeAttachedToController() {
        var scope = $rootScope.$new();
        $controller('TilesArrangementController', {
            $scope: scope
        });
        return scope;
    }

});