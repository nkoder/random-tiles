describe('TilesProvider', function () {

    var TilesProvider;

    beforeEach(module('randomTiles'));

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

});