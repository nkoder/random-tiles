angular
    .module('randomTiles')
    .factory('TilesProvider', function () {

        function Tile() {

            function nextName() {
                var randomNumber = Math.random();
                if (randomNumber < 0.5) {
                    if (randomNumber < 0.25) {
                        return "barcelona-1";
                    }
                    return "celowniki-1"
                }
                if (randomNumber < 0.75) {
                    return "kleks-1";
                }
                return "maziaje-1";
            }

            return {
                name: nextName()
            }

        }

        return {
            randomTile: function () {
                return new Tile();
            }
        };

    });