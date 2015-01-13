angular
    .module('randomTiles')
    .directive('tilesArrangement', function () {

        const scale = 0.5;

        var scope;
        var canvas;

        function link(_scope_, _element_) {
            scope = _scope_;
            canvas = _element_[0];
            scope.$watch('arrangement', updateCanvas);
        }

        function updateCanvas() {
            var arrangement = scope.arrangement;
            if (arrangement) {
                canvas.width = scaled(arrangement.size.width);
                canvas.height = scaled(arrangement.size.height);
                context2d().fillStyle = "#000000";
                context2d().fillRect(0, 0, canvas. width, canvas.height);
                arrangement.tiles.forEach(function (tile) {
                    var tileImage = new Image();
                    tileImage.src = "assets/img/" + tile.name + ".jpg";
                    tileImage.onload = function () {
                        drawTile(tileImage, tile, arrangement.tileSize, arrangement.groutWidth);
                    };
                });
            }
        }

        function drawTile(tileImage, tile, tileSize, groutWidth) {
            var x = (tileSize.width + groutWidth) * (tile.cell.column - 1) + groutWidth;
            var y = (tileSize.height + groutWidth) * (tile.cell.row - 1) + groutWidth;
            var width = tileSize.width;
            var height = tileSize.height;
            context2d().drawImage(tileImage, scaled(x), scaled(y), scaled(width), scaled(height));
            drawTileLabel(tile.name, x + 2, y + 2);
        }

        function drawTileLabel(labelText, x, y) {
            context2d().font = "16px Arial";
            context2d().textBaseline = "top";
            const textXOffset = 2;
            const width = context2d().measureText(labelText).width + textXOffset;
            const height = 16;
            console.log(context2d().measureText(labelText));
            context2d().fillStyle = "#FFFFFF";
            context2d().fillRect(scaled(x), scaled(y), width, height);
            context2d().fillStyle = "#000000";
            context2d().fillText(labelText, scaled(x) + textXOffset, scaled(y));
        }

        function context2d() {
            return canvas.getContext("2d");
        }

        function scaled(dimension) {
            return dimension * scale;
        }

        return {
            restrict: 'E',
            replace: true,
            template: '<canvas id="arrangement"></canvas>',
            link: link
        }
    });


