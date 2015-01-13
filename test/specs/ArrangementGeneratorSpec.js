describe('ArrangementGenerator', function () {

    var ArrangementGenerator;
    var TilesProvider;

    beforeEach(module('randomTiles'));

    beforeEach(inject(function (_ArrangementGenerator_, _TilesProvider_) {
        ArrangementGenerator = _ArrangementGenerator_;
        TilesProvider = _TilesProvider_;
    }));

    it("should generate new arrangement", function () {
        // given:
        const rows = 2;
        const columns = 3;
        const tileInnerWidth = 4;
        const tileInnerHeight = 5;
        const groutWidth = 1;
        spyOn(TilesProvider, "initTiles");
        spyOn(TilesProvider, "randomTile").and.returnValue("random tile");

        // when:
        var arrangement = ArrangementGenerator
            .newArrangementFor(tileInnerWidth, tileInnerHeight, groutWidth, rows, columns);

        // then:
        expect(TilesProvider.initTiles).toHaveBeenCalled();
        var actualPositions = [];
        expect(arrangement.size.width).toBe(columns * (tileInnerWidth + groutWidth));
        expect(arrangement.size.height).toBe(rows * (tileInnerHeight + groutWidth));
        expect(arrangement.tileSize.width).toEqual(tileInnerWidth);
        expect(arrangement.tileSize.height).toEqual(tileInnerHeight);
        expect(arrangement.groutWidth).toEqual(groutWidth);
        expect(arrangement.arrangedTiles.length).toBe(rows * columns);
        arrangement.arrangedTiles.forEach(function (arrangedTile) {
            expect(arrangedTile.tile).toEqual("random tile");
            actualPositions.push(arrangedTile.position);
        });
        expectCells(actualPositions).toContainSameElementsAs(positionsFor(rows, columns));
    });

    function expectCells(actual) {
        return {
            toContainSameElementsAs: function (expected) {
                expect(actual.length).toEqual(expected.length);
                expected.forEach(function (position) {
                    expect(actual).toContain(position);
                });
                actual.forEach(function (position) {
                    expect(expected).toContain(position);
                });
            }
        }
    }

    function positionsFor(rows, columns) {
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