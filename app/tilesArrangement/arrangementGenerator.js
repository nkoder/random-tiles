angular.module('tilesArrangement.arrangementGenerator', ['tilesProvider'])

    .factory('ArrangementGenerator', function (TilesProvider) {

        function Arrangement(rows, columns, tileWidth, tileHeight, groutWidth) {

            var arrangedTiles = [];

            TilesProvider.initTiles();

            var leftPositions = positionsFor(rows, columns);
            while (!_.isEmpty(leftPositions)) {
                var position = _.sample(leftPositions);
                arrangedTiles.push({
                    position: position,
                    clockwiseRotations: _.random(1, 4),
                    tile: TilesProvider.randomTile()
                });
                _.remove(leftPositions, position);
            }

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
                        if (sourceRow === targetRow && sourceColumn === targetColumn) {
                            sourceArrangedTile.clockwiseRotations = (sourceArrangedTile.clockwiseRotations + 1) % 4;
                        }
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

        function positionsFor(rows, columns) {
            var cells = [];
            _.range(1, rows + 1).forEach(function (row) {
                _.range(1, columns + 1).forEach(function (column) {
                    cells.push({
                        row: row,
                        column: column
                    });
                });
            });
            return cells;
        }

        return {
            newArrangementFor: function (rows, columns, tileWidth, tileHeight, groutWidth) {
                return new Arrangement(rows, columns, tileWidth, tileHeight, groutWidth);
            }
        }

    });