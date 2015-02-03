describe('tilesProvider', function () {

    beforeEach(module('tilesProvider'));

    describe('TilesProvider', function () {

        var TilesProvider;

        beforeEach(inject(function (_TilesProvider_) {
            TilesProvider = _TilesProvider_;
        }));

        it("should provide random tile", function () {
            // given:
            TilesProvider.setTilesInTestWith([{
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

        it("should remove used tiles", function () {
            // given:
            TilesProvider.setTilesInTestWith([{
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
            console.log("START TEST");
            TilesProvider.randomTile();
            TilesProvider.randomTile();
            TilesProvider.randomTile();
            TilesProvider.randomTile();

            // then:
            expect(TilesProvider.randomTile().name).not.toBeDefined();
        });

    });
});