describe('tilesArrangement', function () {

    beforeEach(module('tilesArrangement'));

    describe('TilesArrangementController should', function () {

        var $rootScope, $controller;
        var ArrangementGenerator;
        var scope;

        beforeEach(inject(function (_$rootScope_, _$controller_, _ArrangementGenerator_) {
            $rootScope = _$rootScope_;
            $controller = _$controller_;
            ArrangementGenerator = _ArrangementGenerator_;
        }));

        beforeEach(function () {
            createControllerWitchAttachedScope();
        });

        it("not generate arrangement on init", function () {
            // then:
            expect(scope.arrangement).not.toBeDefined();
        });

        it("generate arrangement", function () {
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

        it("not show tiles' labels by default", function () {
            // then:
            expect(scope.shouldShowTilesLabels).toBe(false);
        });

        it("not start swapping tiles by default", function () {
            // then:
            expect(scope.isSwappingTilesInProgress).toBeFalsy();
        });

        it("not start swapping tiles on new arrangement even if it was in progress before", function () {
            // given:
            scope.isSwappingTilesInProgress = true;

            // when:
            generateNextArrangement();

            // then:
            expect(scope.isSwappingTilesInProgress).toBeFalsy();
        });

        function createControllerWitchAttachedScope() {
            scope = $rootScope.$new();
            $controller('TilesArrangementController', {
                $scope: scope
            });
        }

        function generateNextArrangement(rows, columns, tileWidth, tileHeight, groutWidth) {
            scope.generateNextArrangement(rows || 2, columns || 3, tileWidth || 10, tileHeight || 10, groutWidth || 1);
        }

    });

    describe('TilesArrangementDirective should', function () {

        var $compile;
        var scope;

        beforeEach(inject(function (_$compile_, _$rootScope_) {
            $compile = _$compile_;
            scope = _$rootScope_.$new();
        }));

        it("be replaced by 'canvas' HTML element", function () {
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