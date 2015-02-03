angular.module('tilesProvider', ['tilesProvider.tiles'])

    .factory('TilesProvider', function (Tiles) {

        function initTiles() {
            Tiles.initTiles();
        }

        function randomTile() {
            return new Tile();
        }

        function Tile() {
            return {
                name: useNextAvailableName()
            }
        }

        function useNextAvailableName() {
            if (Tiles.tileFamilies().length === 0) {
                return undefined;
            }
            var tileFamily = _.sample(Tiles.tileFamilies());
            var tileType = _.sample(tileFamily.types);
            useOneTileOf(tileFamily.familyName, tileType.id);
            return tileFamily.familyName + "-" + tileType.id;
        }

        function useOneTileOf(usedFamilyName, usedTypeId) {
            var family = _.find(Tiles.tileFamilies(), familyWithNameEqualTo(usedFamilyName));
            var type = _.find(family.types, typeWithIdEqualTo(usedTypeId));
            type.amount -= 1;
            if (type.amount <= 0) {
                _.remove(family.types, typeWithIdEqualTo(usedTypeId));
                if (_.isEmpty(family.types)) {
                    _.remove(Tiles.tileFamilies(), familyWithNameEqualTo(usedFamilyName));
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
            randomTile: randomTile
        };

    });