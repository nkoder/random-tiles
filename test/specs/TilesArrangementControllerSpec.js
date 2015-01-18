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
        scope.rows = rows;
        scope.columns = columns;
        generateNextArrangement(tileWidth, tileHeight, groutWidth);

        // then:
        expect(ArrangementGenerator.newArrangementFor)
            .toHaveBeenCalledWith(rows, columns, tileWidth, tileHeight, groutWidth);
        expect(scope.arrangement).toEqual("new arrangement");
    });

    it("should not show tiles' labels by default", function () {
        // given:

        // when:

        // then:
        expect(scope.shouldShowTilesLabels).toBe(false);
    });

    it("should set default rows and columns number", function () {
        // given:

        // when:

        // then:
        expect(scope.rows).toEqual(22);
        expect(scope.columns).toEqual(9);
    });

    it("should not start swapping tiles by default", function () {
        // given:

        // when:

        // then:
        expect(scope.isSwappingTilesInProgress).toBeFalsy();
    });

    it("should not start swapping tiles on new arrangement even if it was in progress before", function () {
        // given:
        scope.isSwappingTilesInProgress = true;

        // when:
        generateNextArrangement();

        // then:
        expect(scope.isSwappingTilesInProgress).toBeFalsy();
    });

    function createControllerWitchScopeAttached() {
        scope = $rootScope.$new();
        $controller('TilesArrangementController', {
            $scope: scope
        });
    }

    function generateNextArrangement(rows, columns, tileWidth, tileHeight, groutWidth) {
        scope.generateNextArrangement(rows || 2, columns || 3, tileWidth || 10, tileHeight || 10, groutWidth || 1);
    }

});