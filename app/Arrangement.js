var Arrangement = function(tileWidth, tileHeight, rows, columns) {

    var tiles = [];
    _.range(1, rows + 1).forEach(function (row) {
        _.range(1, columns + 1).forEach(function (column) {
            tiles.push(new Tile(row, column));
        });
    });

    return {
        tiles: tiles,
        tileSize: new Size(tileWidth, tileHeight),
        size: new Size(columns * tileWidth, rows * tileHeight)
    }

}