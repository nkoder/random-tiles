angular.module('tilesArrangement.arrangementPicture', [
    'bathroomShape',
    'imageCache'
])

    .constant('SCALE', 0.5)

    .factory('ArrangementPictureCreator', function (BathroomShape, SCALE, ImageCache, $q) {

        function ArrangementPicture(arrangement) {

            function scaled(dimension) {
                return dimension * SCALE;
            }

            function unscaled(dimension) {
                return dimension / SCALE;
            }

            function width() {
                return scaled(arrangement.size.width);
            }

            function height() {
                return scaled(arrangement.size.height);
            }

            function loadImagesAndThen(callbackOnImagesLoaded) {
                var images = [];
                var imagesLoadedPromises = [];
                arrangement.arrangedTiles.forEach(function (arrangedTile) {
                    var tileName = arrangedTile.tile.name;
                    if (tileName === undefined || images[tileName]) {
                        return;
                    }
                    var whenImageLoaded = ImageCache.loadImageNamed(tileName);
                    whenImageLoaded.then(function (image) {
                        images[tileName] = image;
                    });
                    imagesLoadedPromises.push(whenImageLoaded);
                });
                $q.all(imagesLoadedPromises).then(function () {
                    callbackOnImagesLoaded(images);
                });
            }

            function forEachTile(callback) {
                arrangement.arrangedTiles.forEach(function (arrangedTile) {
                    var tileName = arrangedTile.tile.name;
                    if (!!tileName) {
                        var x = scaled(
                            (arrangement.tileSize.width + arrangement.groutWidth) * (arrangedTile.position.column - 1)
                            + arrangement.groutWidth);
                        var y = scaled(
                            (arrangement.tileSize.height + arrangement.groutWidth) * (arrangedTile.position.row - 1)
                            + arrangement.groutWidth);
                        var width = scaled(arrangement.tileSize.width);
                        var height = scaled(arrangement.tileSize.height);
                        var rotation = arrangedTile.clockwiseRotations * 90 * (Math.PI / 180);
                        callback(tileName, x, y, width, height, rotation);
                    }
                });
            }

            function cellAt(x, y) {
                x = unscaled(x);
                y = unscaled(y);
                var cellWidth = arrangement.tileSize.width + arrangement.groutWidth;
                var cellHeight = arrangement.tileSize.height + arrangement.groutWidth;
                return {
                    row: Math.floor(y / cellHeight) + 1,
                    column: Math.floor(x / cellWidth) + 1
                }
            }

            function rectangleIn(cell) {
                var tileSize = arrangement.tileSize;
                var groutWidth = arrangement.groutWidth;
                return {
                    x: scaled((tileSize.width + groutWidth) * (cell.column - 1) + groutWidth),
                    y: scaled((tileSize.height + groutWidth) * (cell.row - 1) + groutWidth),
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
                cellAt: cellAt,
                rectangleIn: rectangleIn,
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