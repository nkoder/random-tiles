describe('tilesArrangement', function () {

    beforeEach(module('tilesArrangement'));

    describe('TilesArrangementController', function () {

        var $rootScope, $controller;
        var ArrangementGenerator;
        var scope;

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

        it("should generate arrangement", function () {
            // given:
            const rows = 20;
            const columns = 11;
            const tileWidth = 6;
            const tileHeight = 7;
            const groutWidth = 7;
            spyOn(ArrangementGenerator, "newArrangementFor").and.returnValue("new arrangement");

            // when:
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

    describe('TilesArrangementDirective', function () {

        var $compile;
        var scope;

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
});