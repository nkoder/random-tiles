describe('tilesProvider', function () {

    beforeEach(module('tilesProvider'));

    describe('TilesProvider should', function () {

        var TilesProvider;
        var Tiles;

        beforeEach(inject(function (_TilesProvider_, _Tiles_) {
            TilesProvider = _TilesProvider_;
            Tiles = _Tiles_;
        }));

        it("provide random tile", function () {
            // given:
            spyOn(Tiles, "tileFamilies").and.returnValue([{
                familyName: "familyA",
                types: [{
                    id: 1,
                    amount: 2
                }]
            }]);

            // when:
            var tile = TilesProvider.randomTile();

            // then:
            expect(tile.name).toEqual("familyA-1");
        });

        it("remove used tiles", function () {
            // given:
            spyOn(Tiles, "tileFamilies").and.returnValue([{
                familyName: "familyA",
                types: [{
                    id: 1,
                    amount: 2
                }]
            }, {
                familyName: "familyB",
                types: [{
                    id: 1,
                    amount: 1
                }, {
                    id: 2,
                    amount: 1
                }]
            }]);

            // when:
            TilesProvider.randomTile();
            TilesProvider.randomTile();
            TilesProvider.randomTile();
            TilesProvider.randomTile();

            // then:
            expect(TilesProvider.randomTile().name).not.toBeDefined();
        });

    });
});