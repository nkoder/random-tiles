angular
    .module('randomTiles')
    .factory('ArrangementGenerator', function (_TilesProvider_) {

        var TilesProvider = _TilesProvider_;

        function Arrangement(tileWidth, tileHeight, groutWidth, rows, columns) {

            var arrangedTiles = [];

            _.range(1, rows + 1).forEach(function (row) {
                _.range(1, columns + 1).forEach(function (column) {
                    arrangedTiles.push({
                        position: {
                            row: row,
                            column: column
                        },
                        tile: TilesProvider.randomTile()
                    });
                });
            });

            return {
                size: new Size(columns * (tileWidth + groutWidth), rows * (tileHeight + groutWidth)),
                groutWidth: groutWidth,
                tileSize: new Size(tileWidth, tileHeight),
                arrangedTiles: arrangedTiles
            };

        }

        function Size(width, height) {
            return {
                width: width,
                height: height
            }
        }

        return {
            newArrangementFor: function (tileWidth, tileHeight, groutWidth, rows, columns) {
                return new Arrangement(tileWidth, tileHeight, groutWidth, rows, columns);
            }
        }

    });