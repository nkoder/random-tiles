angular
    .module('randomTiles')
    .factory('ArrangementGenerator', function () {

        function ArrangementGenerator() {
            return {
                newArrangementFor: function(tileWidth, tileHeight, groutWidth, rows, columns) {
                    return new Arrangement(tileWidth, tileHeight, groutWidth, rows, columns);
                }
            }
        }

        function Arrangement(tileWidth, tileHeight, groutWidth, rows, columns) {

            var tiles = [];
            _.range(1, rows + 1).forEach(function (row) {
                _.range(1, columns + 1).forEach(function (column) {
                    tiles.push(new Tile(row, column));
                });
            });

            return {
                size: new Size(columns * (tileWidth + groutWidth), rows * (tileHeight + groutWidth)),
                groutWidth: groutWidth,
                tileSize: new Size(tileWidth, tileHeight),
                tiles: tiles
            };

        }

        function Tile(row, column) {

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
                name: nextName(),
                cell: {
                    row: row,
                    column: column
                }
            }

        }

        function Size(width, height) {
            return {
                width: width,
                height: height
            }
        }

        return new ArrangementGenerator();

    });