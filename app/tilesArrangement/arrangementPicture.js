angular.module('tilesArrangement.arrangementPicture', ['bathroomShape'])

    .factory('ArrangementPictureCreator', function (BathroomShape) {

        function ArrangementPicture(arrangement) {

            const scale = 0.5;

            function scaled(dimension) {
                return dimension * scale;
            }

            function unscaled(dimension) {
                return dimension / scale;
            }

            function width() {
                return scaled(arrangement.size.width);
            }

            function height() {
                return scaled(arrangement.size.height);
            }

            function loadImagesAndThen(callback) {
                var images = [];
                var imagesLoaded = 0;
                var imagesToBeLoaded = 0;
                arrangement.arrangedTiles.forEach(function (arrangedTile) {
                    var tileName = arrangedTile.tile.name;
                    if (tileName === undefined || images[tileName]) {
                        return;
                    }
                    imagesToBeLoaded++;
                    var image = new Image();
                    image.src = "assets/img/" + tileName + ".jpg";
                    image.onload = function () {
                        imagesLoaded++;
                        if (imagesLoaded >= imagesToBeLoaded) {
                            callback(images);
                        }
                    };
                    images[tileName] = image;
                });
            }

            function forEachTile(callback) {
                arrangement.arrangedTiles.forEach(function (arrangedTile) {
                    var tileName = arrangedTile.tile.name;
                    if (!!tileName) {
                        var x = scaled((arrangement.tileSize.width + arrangement.groutWidth) * (arrangedTile.position.column - 1) + arrangement.groutWidth);
                        var y = scaled((arrangement.tileSize.height + arrangement.groutWidth) * (arrangedTile.position.row - 1) + arrangement.groutWidth);
                        var width = scaled(arrangement.tileSize.width);
                        var height = scaled(arrangement.tileSize.height);
                        var rotation = arrangedTile.clockwiseRotations * 90 * (Math.PI / 180);
                        callback(tileName, x, y, width, height, rotation);
                    }
                });
            }

            function columnAt(x) {
                x = unscaled(x);
                if (!!arrangement) {
                    var columnWidth = arrangement.tileSize.width + arrangement.groutWidth;
                    return Math.floor(x / columnWidth) + 1;
                }
            }

            function rowAt(y) {
                y = unscaled(y);
                if (!!arrangement) {
                    var rowHeight = arrangement.tileSize.height + arrangement.groutWidth;
                    return Math.floor(y / rowHeight) + 1;
                }
            }

            function tileRectangleAt(row, column) {
                var tileSize = arrangement.tileSize;
                var groutWidth = arrangement.groutWidth;
                return {
                    x: scaled((tileSize.width + groutWidth) * (column - 1) + groutWidth),
                    y: scaled((tileSize.height + groutWidth) * (row - 1) + groutWidth),
                    width: scaled(tileSize.width),
                    height: scaled(tileSize.height)
                }
            }

            function forEachLineInBathroomShape(callback) {
                var lines = _.union(BathroomShape.mainLines(), BathroomShape.showerPlatformLines());
                _.forEach(lines, function (line) {
                    callback({
                        x1: scaled(line.x1),
                        x2: scaled(line.x2),
                        y1: scaled(line.y1),
                        y2: scaled(line.y2)
                    });
                });
            }

            return {
                width: width,
                height: height,
                columnAt: columnAt,
                rowAt: rowAt,
                tileRectangleAt: tileRectangleAt,
                loadImagesAndThen: loadImagesAndThen,
                forEachTile: forEachTile,
                forEachLineInBathroomShape: forEachLineInBathroomShape
            }
        }

        return {
            newPictureOf: function (arrangement) {
                return !!arrangement ? new ArrangementPicture(arrangement) : undefined;
            }
        }
    });