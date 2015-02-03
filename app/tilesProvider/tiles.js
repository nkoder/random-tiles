angular.module('tilesProvider.tiles', [])

    .factory('Tiles', function () {

        var tileFamilies = [];

        function initTiles() {
            tileFamilies = [
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
                    .withType(1).inAmountOf(25)
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
            ];
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

        return {
            initTiles: initTiles,
            tileFamilies: function () {
                return tileFamilies;
            }
        };

    });