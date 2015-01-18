angular
    .module('randomTiles')
    .factory('TilesProvider', function () {

        var tileFamilies = [];

        function randomTile() {
            return new Tile();
        }

        function Tile() {
            return {
                name: useNextAvailableName()
            }
        }

        function useNextAvailableName() {
            if (tileFamilies.length === 0) {
                return undefined;
            }
            var tileFamily = _.sample(tileFamilies);
            var tileType = _.sample(tileFamily.types);
            useOneTileOf(tileFamily.familyName, tileType.id);
            return tileFamily.familyName + "-" + tileType.id;
        }

        function newTileFamily() {
            var recentlySpecifiedTypeId;
            var tileFamily = {
                types: []
            };
            return {
                withType: function (typeId) {
                    recentlySpecifiedTypeId = typeId;
                    return this;
                },
                inAmountOf: function (amount) {
                    tileFamily.types.push({
                        id: recentlySpecifiedTypeId,
                        amount: amount
                    });
                    return this;
                },
                named: function (familyName) {
                    tileFamily.familyName = familyName;
                    return tileFamily;
                }
            }
        }

        function initTiles() {
            setTiles([
                newTileFamily()
                    .withType(1).inAmountOf(5)
                    .withType(2).inAmountOf(8)
                    .named("barcelona"),
                newTileFamily()
                    .withType(1).inAmountOf(5)
                    .withType(2).inAmountOf(6)
                    .named("celowniki"),
                newTileFamily()
                    .withType(1).inAmountOf(7)
                    .withType(2).inAmountOf(6)
                    .withType(3).inAmountOf(6)
                    .named("cytryny"),
                newTileFamily()
                    .withType(1).inAmountOf(6)
                    .named("kapsle"),
                newTileFamily()
                    .withType(1).inAmountOf(5)
                    .withType(2).inAmountOf(4)
                    .withType(3).inAmountOf(5)
                    .named("kawa"),
                newTileFamily()
                    .withType(1).inAmountOf(2)
                    .withType(2).inAmountOf(3)
                    .withType(3).inAmountOf(6)
                    .named("kleks"),
                newTileFamily()
                    .withType(1).inAmountOf(5)
                    .withType(2).inAmountOf(5)
                    .withType(3).inAmountOf(5)
                    .withType(4).inAmountOf(8)
                    .named("kolibry"),
                newTileFamily()
                    .withType(1).inAmountOf(5)
                    .withType(2).inAmountOf(5)
                    .withType(3).inAmountOf(3)
                    .withType(4).inAmountOf(6)
                    .named("kotki"),
                newTileFamily()
                    .withType(1).inAmountOf(6)
                    .withType(2).inAmountOf(6)
                    .withType(3).inAmountOf(5)
                    .named("kwiatki"),
                newTileFamily()
                    .withType(1).inAmountOf(17)
                    .named("maziaje"),
                newTileFamily()
                    .withType(1).inAmountOf(8)
                    .withType(2).inAmountOf(6)
                    .withType(3).inAmountOf(6)
                    .withType(4).inAmountOf(7)
                    .named("paproc"),
                newTileFamily()
                    .withType(1).inAmountOf(4)
                    .withType(2).inAmountOf(5)
                    .withType(3).inAmountOf(6)
                    .named("piksele")
            ]);
        }

        function setTiles(newTiles) {
            tileFamilies = newTiles;
        }

        function useOneTileOf(usedFamilyName, usedTypeId) {
            var family = _.find(tileFamilies, familyWithNameEqualTo(usedFamilyName));
            var type = _.find(family.types, typeWithIdEqualTo(usedTypeId));
            type.amount -= 1;
            if (type.amount <= 0) {
                _.remove(family.types, typeWithIdEqualTo(usedTypeId));
                if (_.isEmpty(family.types)) {
                    _.remove(tileFamilies, familyWithNameEqualTo(usedFamilyName));
                }
            }
        }

        function familyWithNameEqualTo(familyName) {
            return function (family) {
                return family.familyName === familyName;
            }
        }

        function typeWithIdEqualTo(typeId) {
            return function (type) {
                return type.id === typeId;
            }
        }

        return {
            initTiles: initTiles,
            randomTile: randomTile,
            setTilesInTestWith: setTiles
        };

    });