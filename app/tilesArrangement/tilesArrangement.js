angular.module('tilesArrangement', ['tilesArrangement.arrangementGenerator', 'bathroomShape'])

    .controller('TilesArrangementController', function ($scope, ArrangementGenerator) {

        $scope.shouldShowTilesLabels = false;
        const rows = 20;
        const columns = 11;

        $scope.generateNextArrangement = function (tileWidth, tileHeight, groutWidth) {
            $scope.isSwappingTilesInProgress = false;
            $scope.arrangement =
                ArrangementGenerator.newArrangementFor(rows, columns, tileWidth, tileHeight, groutWidth);
        };

    })

    .directive('tilesArrangement', function (BathroomShape) {

        const scale = 0.5;

        var scope;
        var canvas;
        var arrangement;
        var sourceRowToSwap, sourceColumnToSwap;
        var images, imagesLoaded, imagesToBeLoaded;

        function link(_scope_, _element_) {
            scope = _scope_;
            _element_.on("click", toggleSwappingTiles);
            canvas = _element_[0];
            scope.$watch('arrangement', updateCanvas);
            scope.$watch('shouldShowTilesLabels', updateCanvas);
        }

        function toggleSwappingTiles(event) {
            var column = columnAt(unscaled(event.offsetX));
            var row = rowAt(unscaled(event.offsetY));
            if (!!scope.isSwappingTilesInProgress) {
                stopSwappingTilesAt(row, column);
            } else {
                startSwappingTilesAt(row, column);
            }
        }

        function startSwappingTilesAt(row, column) {
            scope.isSwappingTilesInProgress = true;
            sourceRowToSwap = row;
            sourceColumnToSwap = column;
            highlightTileAt(row, column);
        }

        function stopSwappingTilesAt(row, column) {
            scope.isSwappingTilesInProgress = false;
            arrangement.swapTileAt(sourceRowToSwap, sourceColumnToSwap).withTileAt(row, column);
            sourceRowToSwap = undefined;
            sourceColumnToSwap = undefined;
            updateCanvas();
        }

        function updateCanvas() {
            arrangement = scope.arrangement;
            if (arrangement) {
                resetCanvas();
                loadImages();
            }
        }

        function resetCanvas() {
            canvas.width = scaled(arrangement.size.width);
            canvas.height = scaled(arrangement.size.height);
            context2d().fillStyle = "#FFFFFF";
            context2d().fillRect(0, 0, canvas.width, canvas.height);
        }

        function loadImages() {
            images = [];
            imagesLoaded = 0;
            imagesToBeLoaded = 0;
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
                        drawTiles();
                        drawBathroomShape();
                    }
                };
                images[tileName] = image;
            });
        }

        function drawTiles() {
            arrangement.arrangedTiles.forEach(function (arrangedTile) {
                var tileName = arrangedTile.tile.name;
                if (tileName) {
                    drawTile(images[tileName], arrangedTile, arrangement.tileSize, arrangement.groutWidth);
                }
            });
        }

        function drawTile(tileImage, arrangedTile, tileSize, groutWidth) {
            var x = (tileSize.width + groutWidth) * (arrangedTile.position.column - 1) + groutWidth;
            var y = (tileSize.height + groutWidth) * (arrangedTile.position.row - 1) + groutWidth;
            var width = tileSize.width;
            var height = tileSize.height;
            context2d().save();
            context2d().translate(scaled(x + width / 2), scaled(y + height / 2));
            context2d().rotate(arrangedTile.clockwiseRotations * 90 * (Math.PI / 180));
            context2d().drawImage(tileImage, scaled(-width / 2), scaled(-height / 2), scaled(width), scaled(height));
            context2d().restore();
            if (shouldShowTilesLabels()) {
                drawTileLabel(arrangedTile.tile.name, x + 2, y + 2);
            }
        }

        function drawTileLabel(labelText, x, y) {
            context2d().save();
            context2d().font = "16px Arial";
            context2d().textBaseline = "top";
            const textXOffset = 2;
            const width = context2d().measureText(labelText).width + textXOffset;
            const height = 16;
            context2d().fillStyle = "#FFFFFF";
            context2d().fillRect(scaled(x), scaled(y), width, height);
            context2d().fillStyle = "#000000";
            context2d().fillText(labelText, scaled(x) + textXOffset, scaled(y));
            context2d().restore();
        }

        function drawBathroomShape() {
            context2d().save();
            context2d().globalAlpha = 0.6;
            context2d().beginPath();
            context2d().strokeStyle = "#FF0000";
            context2d().lineWidth = 5;
            drawShape(BathroomShape.mainLines());
            drawShape(BathroomShape.showerLines());
            context2d().closePath();
            context2d().stroke();
            context2d().restore();
        }

        function drawShape(lines) {
            _.forEach(lines, function (line) {
                context2d().moveTo(scaled(line.x1), scaled(line.y1));
                context2d().lineTo(scaled(line.x2), scaled(line.y2));
            });
        }

        function highlightTileAt(row, column) {
            var tileSize = arrangement.tileSize;
            var groutWidth = arrangement.groutWidth;
            var x = (tileSize.width + groutWidth) * (column - 1) + groutWidth;
            var y = (tileSize.height + groutWidth) * (row - 1) + groutWidth;
            var width = tileSize.width;
            var height = tileSize.height;
            context2d().save();
            context2d().globalAlpha = 0.4;
            context2d().fillStyle = "#999900";
            context2d().fillRect(scaled(x), scaled(y), scaled(width), scaled(height));
            context2d().restore();
        }

        function context2d() {
            return canvas.getContext("2d");
        }

        function scaled(dimension) {
            return dimension * scale;
        }

        function unscaled(dimension) {
            return dimension / scale;
        }

        function shouldShowTilesLabels() {
            return scope.shouldShowTilesLabels;
        }

        function columnAt(x) {
            if (arrangement) {
                var columnWidth = arrangement.tileSize.width + arrangement.groutWidth;
                return Math.floor(x / columnWidth) + 1;
            }
        }

        function rowAt(y) {
            if (arrangement) {
                var rowHeight = arrangement.tileSize.height + arrangement.groutWidth;
                return Math.floor(y / rowHeight) + 1;
            }
        }

        return {
            restrict: 'E',
            replace: true,
            template: '<canvas id="arrangement"></canvas>',
            link: link
        }
    });