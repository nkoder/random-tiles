describe('TilesProvider', function () {

    var TilesProvider;

    beforeEach(module('randomTiles'));

    beforeEach(inject(function (_TilesProvider_) {
        TilesProvider = _TilesProvider_;
    }));

    it("should provide random tile", function () {
        // given:

        // when:
        var tile = TilesProvider.randomTile();

        // then:
        expect(tile.name).toBeDefined();
    });

});