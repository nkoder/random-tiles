describe('tilesProvider', function () {

    beforeEach(module('tilesProvider'));

    describe('TilesProvider should', function () {

        var TilesProvider;
        var Tiles;

        beforeEach(inject(function (_TilesProvider_, _Tiles_) {
            TilesProvider = _TilesProvider_;
            Tiles = _Tiles_;
        }));

        it("provide next random tile", function () {
            // given:
            providedTilesAre([{
                familyName: "familyA",
                types: [{
                    id: 1,
                    amount: 2
                }]
            }]);
            TilesProvider.reset();

            // when:
            var tile = TilesProvider.nextRandomTile();

            // then:
            expect(tile.name).toEqual("familyA-1");
        });

        it("remove used tiles", function () {
            // given:
            providedTilesAre([{
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
            TilesProvider.reset();

            // when:
            TilesProvider.nextRandomTile();
            TilesProvider.nextRandomTile();
            TilesProvider.nextRandomTile();
            TilesProvider.nextRandomTile();

            // then:
            expect(TilesProvider.nextRandomTile().name).not.toBeDefined();
        });

        it("use all available tiles again after reset", function () {
            // given:
            providedTilesAre([{
                familyName: "familyA",
                types: [{
                    id: 1,
                    amount: 1
                }]
            }]);
            TilesProvider.reset();
            TilesProvider.nextRandomTile();

            // when:
            TilesProvider.reset();

            // then:
            expect(TilesProvider.nextRandomTile().name).toEqual("familyA-1");
        });

        function providedTilesAre(tiles) {
            spyOn(Tiles, "byFamily").and.callFake(function () {
                return deepCopyOf(tiles);
            });
        }

        function deepCopyOf(object) {
            return JSON.parse(JSON.stringify(object))
        }

    });
});