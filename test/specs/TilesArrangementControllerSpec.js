describe('TilesArrangementController', function () {

    var $rootScope, $controller;

    beforeEach(module('randomTiles'));

    beforeEach(inject(function (_$rootScope_, _$controller_) {
        $rootScope = _$rootScope_;
        $controller = _$controller_;
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
        var scope = scopeAttachedToController();
        var rows = 2;
        var columns = 3;

        // when:
        scope.generateNextArrangement(rows, columns);

        // then:
        var actualCells = [];
        expect(scope.arrangement.tiles.length).toBe(rows * columns);
        scope.arrangement.tiles.forEach(function (tile) {
            expect(tile.name).toBeDefined();
            expect(tile.width).toEqual(200);
            expect(tile.height).toEqual(200);
            actualCells.push(tile.cell);
        });
        expectCells(actualCells).toContainSameElementsAs(cellsFor(rows, columns));
    });

    function scopeAttachedToController() {
        var scope = $rootScope.$new();
        $controller('TilesArrangementController', {
            $scope: scope
        });
        return scope;
    }

    function expectCells(actual) {
        return {
            toContainSameElementsAs: function (expected) {
                expect(actual.length).toEqual(expected.length);
                expected.forEach(function (cell) {
                    expect(actual).toContain(cell);
                });
                actual.forEach(function (cell) {
                    expect(expected).toContain(cell);
                });
            }
        }
    }

    function cellsFor(rows, columns) {
        var cells = [];
        _.range(1, rows + 1).forEach(function (row) {
            _.range(1, columns + 1).forEach(function (column) {
                cells.push({
                    row: row,
                    column: column
                });
            });
        });
        return cells;
    }

});