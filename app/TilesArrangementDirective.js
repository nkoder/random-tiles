angular
    .module('randomTiles')
    .directive('tilesArrangement', function () {

        const scale = 0.5;

        var scope;
        var canvas;
        var arrangement;
        var sourceRowToSwap, sourceColumnToSwap;

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
                canvas.width = scaled(arrangement.size.width);
                canvas.height = scaled(arrangement.size.height);
                context2d().fillStyle = "#000000";
                context2d().fillRect(0, 0, canvas. width, canvas.height);
                arrangement.arrangedTiles.forEach(function (arrangedTile) {
                    var tileImage = new Image();
                    tileImage.src = "assets/img/" + arrangedTile.tile.name + ".jpg";
                    tileImage.onload = function () {
                        drawTile(tileImage, arrangedTile, arrangement.tileSize, arrangement.groutWidth);
                    };
                });
            }
        }

        function drawTile(tileImage, arrangedTile, tileSize, groutWidth) {
            var x = (tileSize.width + groutWidth) * (arrangedTile.position.column - 1) + groutWidth;
            var y = (tileSize.height + groutWidth) * (arrangedTile.position.row - 1) + groutWidth;
            var width = tileSize.width;
            var height = tileSize.height;
            context2d().drawImage(tileImage, scaled(x), scaled(y), scaled(width), scaled(height));
            if (shouldShowTilesLabels()) {
                drawTileLabel(arrangedTile.tile.name, x + 2, y + 2);
            }
        }

        function drawTileLabel(labelText, x, y) {
            context2d().font = "16px Arial";
            context2d().textBaseline = "top";
            const textXOffset = 2;
            const width = context2d().measureText(labelText).width + textXOffset;
            const height = 16;
            context2d().fillStyle = "#FFFFFF";
            context2d().fillRect(scaled(x), scaled(y), width, height);
            context2d().fillStyle = "#000000";
            context2d().fillText(labelText, scaled(x) + textXOffset, scaled(y));
        }

        function highlightTileAt(row, column) {
            var lastAlpha = context2d().globalAlpha;
            context2d().globalAlpha = 0.4;
            context2d().fillStyle = "#999900";
            var tileSize = arrangement.tileSize;
            var groutWidth = arrangement.groutWidth;
            var x = (tileSize.width + groutWidth) * (column - 1) + groutWidth;
            var y = (tileSize.height + groutWidth) * (row - 1) + groutWidth;
            var width = tileSize.width;
            var height = tileSize.height;
            context2d().fillRect(scaled(x), scaled(y), scaled(width), scaled(height));
            context2d().globalAlpha = lastAlpha;
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


