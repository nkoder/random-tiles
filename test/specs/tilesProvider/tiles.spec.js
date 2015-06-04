describe('tilesProvider.tiles', function () {

    beforeEach(module('tilesProvider.tiles'));

    describe('Tiles should', function () {

        var Tiles;

        beforeEach(inject(function (_Tiles_) {
            Tiles = _Tiles_;
        }));

        it("have proper structure", function () {
            // when:
            var tilesByFamily = Tiles.byFamily();

            // then:
            expect(tilesByFamily[0].familyName).toBeDefined();
            expect(tilesByFamily[0].types[0].id).toBeDefined();
            expect(tilesByFamily[0].types[0].amount).toBeDefined();
        });

    });
});