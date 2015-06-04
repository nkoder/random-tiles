angular.module('tilesProvider', ['tilesProvider.tiles'])

    .factory('TilesProvider', function (Tiles) {

        var tilesByFamily;

        function reset() {
            tilesByFamily = Tiles.byFamily();
        }

        function nextRandomTile() {
            return new Tile(useNextAvailableName());
        }

        function Tile(name) {
            return {
                name: name
            }
        }

        function useNextAvailableName() {
            if (tilesByFamily.length === 0) {
                return undefined;
            }
            var tileFamily = _.sample(tilesByFamily);
            var tileType = _.sample(tileFamily.types);
            useOneTileOf(tileFamily.familyName, tileType.id);
            return tileFamily.familyName + "-" + tileType.id;
        }

        function useOneTileOf(usedFamilyName, usedTypeId) {
            var family = _.find(tilesByFamily, familyWithNameEqualTo(usedFamilyName));
            var type = _.find(family.types, typeWithIdEqualTo(usedTypeId));
            type.amount -= 1;
            if (type.amount <= 0) {
                _.remove(family.types, typeWithIdEqualTo(usedTypeId));
                if (_.isEmpty(family.types)) {
                    _.remove(tilesByFamily, familyWithNameEqualTo(usedFamilyName));
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
            reset: reset,
            nextRandomTile: nextRandomTile
        };

    });