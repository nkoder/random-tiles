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
        var arrangement = newArrangementFor(rows, columns, tileInnerWidth, tileInnerHeight, groutWidth);

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
            expect(arrangedTile.clockwiseRotations).toBeDefined();
        });
        expectCells(actualPositions).toContainSameElementsAs(positionsFor(rows, columns));
    });

    it("should swap tiles", function () {
        // given:
        const rows = 3;
        const columns = 4;
        var arrangement = newArrangementFor(rows, columns);
        tileIn(arrangement).at(1, 2).tile.name = "tile1";
        tileIn(arrangement).at(3, 4).tile.name = "tile2";

        // when:
        arrangement.swapTileAt(1, 2).withTileAt(3, 4);

        // then:
        expect(tileIn(arrangement).at(1, 2).tile.name).toEqual("tile2");
        expect(tileIn(arrangement).at(3, 4).tile.name).toEqual("tile1");
    });

    it("should swap tile with itself", function () {
        // given:
        const rows = 3;
        const columns = 4;
        var arrangement = newArrangementFor(rows, columns);
        tileIn(arrangement).at(1, 2).tile.name = "tile1";
        tileIn(arrangement).at(3, 4).tile.name = "tile2";

        // when:
        arrangement.swapTileAt(1, 2).withTileAt(1, 2);

        // then:
        expect(tileIn(arrangement).at(1, 2).tile.name).toEqual("tile1");
        expect(tileIn(arrangement).at(3, 4).tile.name).toEqual("tile2");
    });

    it("should rotate tile when swapping with itself", function () {
        // given:
        const rows = 1;
        const columns = 4;
        var arrangement = newArrangementFor(rows, columns);
        tileIn(arrangement).at(1, 1).clockwiseRotations = 0;
        tileIn(arrangement).at(1, 2).clockwiseRotations = 1;
        tileIn(arrangement).at(1, 3).clockwiseRotations = 2;
        tileIn(arrangement).at(1, 4).clockwiseRotations = 3;

        // when:
        arrangement.swapTileAt(1, 1).withTileAt(1, 1);
        arrangement.swapTileAt(1, 2).withTileAt(1, 2);
        arrangement.swapTileAt(1, 3).withTileAt(1, 3);
        arrangement.swapTileAt(1, 4).withTileAt(1, 4);

        // then:
        expect(tileIn(arrangement).at(1, 1).clockwiseRotations).toEqual(1);
        expect(tileIn(arrangement).at(1, 2).clockwiseRotations).toEqual(2);
        expect(tileIn(arrangement).at(1, 3).clockwiseRotations).toEqual(3);
        expect(tileIn(arrangement).at(1, 4).clockwiseRotations).toEqual(0);
    });

    function newArrangementFor(rows, columns, tileInnerWidth, tileInnerHeight, groutWidth) {
        return ArrangementGenerator
            .newArrangementFor(rows || 2, columns || 3, tileInnerWidth || 10, tileInnerHeight || 10, groutWidth || 1);
    }

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

    function tileIn(arrangement) {
        return {
            at: function (row, column) {
                return _.find(arrangement.arrangedTiles, function (arrangedTile) {
                    return arrangedTile.position.row === row
                        && arrangedTile.position.column === column;
                });
            }
        }
    }

});