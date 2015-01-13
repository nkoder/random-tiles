angular
    .module('randomTiles')
    .factory('ArrangementGenerator', function (_TilesProvider_) {

        var TilesProvider = _TilesProvider_;

        function Arrangement(rows, columns, tileWidth, tileHeight, groutWidth) {

            var arrangedTiles = [];

            TilesProvider.initTiles();

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

            function swapTileAt(sourceRow, sourceColumn) {
                return {
                    withTileAt: function (targetRow, targetColumn) {
                        var sourceArrangedTile = _.find(arrangedTiles, function (arrangedTile) {
                            return arrangedTile.position.row === sourceRow
                                && arrangedTile.position.column === sourceColumn;
                        });
                        var targetArrangedTile = _.find(arrangedTiles, function (arrangedTile) {
                            return arrangedTile.position.row === targetRow
                                && arrangedTile.position.column === targetColumn;
                        });
                        sourceArrangedTile.position.row = targetRow;
                        sourceArrangedTile.position.column = targetColumn;
                        targetArrangedTile.position.row = sourceRow;
                        targetArrangedTile.position.column = sourceColumn;
                    }
                }
            }

            return {
                size: new Size(columns * (tileWidth + groutWidth), rows * (tileHeight + groutWidth)),
                groutWidth: groutWidth,
                tileSize: new Size(tileWidth, tileHeight),
                arrangedTiles: arrangedTiles,
                swapTileAt: swapTileAt
            };

        }

        function Size(width, height) {
            return {
                width: width,
                height: height
            }
        }

        return {
            newArrangementFor: function (rows, columns, tileWidth, tileHeight, groutWidth) {
                return new Arrangement(rows, columns, tileWidth, tileHeight, groutWidth);
            }
        }

    });