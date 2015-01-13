describe('ArrangementGenerator', function () {

    var ArrangementGenerator;

    beforeEach(module('randomTiles'));

    beforeEach(inject(function (_ArrangementGenerator_) {
        ArrangementGenerator = _ArrangementGenerator_;
    }));

    it("should generate new arrangement", function () {
        // given:
        const rows = 2;
        const columns = 3;
        const tileInnerWidth = 4;
        const tileInnerHeight = 5;
        const groutWidth = 1;

        // when:
        var arrangement = ArrangementGenerator
            .newArrangementFor(tileInnerWidth, tileInnerHeight, groutWidth, rows, columns);

        // then:
        var actualCells = [];
        expect(arrangement.size.width).toBe(columns * (tileInnerWidth + groutWidth));
        expect(arrangement.size.height).toBe(rows * (tileInnerHeight + groutWidth));
        expect(arrangement.tileSize.width).toEqual(tileInnerWidth);
        expect(arrangement.tileSize.height).toEqual(tileInnerHeight);
        expect(arrangement.groutWidth).toEqual(groutWidth);
        expect(arrangement.tiles.length).toBe(rows * columns);
        arrangement.tiles.forEach(function (tile) {
            expect(tile.name).toBeDefined();
            actualCells.push(tile.cell);
        });
        expectCells(actualCells).toContainSameElementsAs(cellsFor(rows, columns));
    });

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