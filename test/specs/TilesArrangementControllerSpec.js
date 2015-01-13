describe('TilesArrangementController', function () {

    var $rootScope, $controller;
    var ArrangementGenerator;
    var scope;

    beforeEach(module('randomTiles'));

    beforeEach(inject(function (_$rootScope_, _$controller_, _ArrangementGenerator_) {
        $rootScope = _$rootScope_;
        $controller = _$controller_;
        ArrangementGenerator = _ArrangementGenerator_;
    }));

    beforeEach(function () {
        createControllerWitchScopeAttached();
    });

    it("should not generate arrangement on init", function () {
        // given:

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
        spyOn(ArrangementGenerator, "newArrangementFor").and.returnValue("new arrangement");

        // when:
        generateNextArrangement(tileWidth, tileHeight, groutWidth, rows, columns);

        // then:
        expect(ArrangementGenerator.newArrangementFor)
            .toHaveBeenCalledWith(tileWidth, tileHeight, groutWidth, rows, columns);
        expect(scope.arrangement).toEqual("new arrangement");
    });

    it("should not show tiles' labels by default", function () {
        // given:

        // when:
        generateNextArrangement();

        // then:
        expect(scope.shouldShowTilesLabels).toBe(false);
    });

    function createControllerWitchScopeAttached() {
        scope = $rootScope.$new();
        $controller('TilesArrangementController', {
            $scope: scope
        });
    }

    function generateNextArrangement(tileWidth, tileHeight, groutWidth, rows, columns) {
        scope.generateNextArrangement(tileWidth || 10, tileHeight || 10, groutWidth || 1, rows || 2, columns || 3);
    }

});