describe('tilesProvider.tiles', function () {

    beforeEach(module('tilesProvider.tiles'));

    describe('Tiles should', function () {

        var Tiles;

        beforeEach(inject(function (_Tiles_) {
            Tiles = _Tiles_;
        }));

        it("have proper structure", function () {
            // given:
            Tiles.initTiles();

            // when:
            var tileFamilies = Tiles.tileFamilies();

            // then:
            expect(tileFamilies[0].familyName).toBeDefined();
            expect(tileFamilies[0].types[0].id).toBeDefined();
            expect(tileFamilies[0].types[0].amount).toBeDefined();
        });

    });
});