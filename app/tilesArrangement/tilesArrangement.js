angular.module('tilesArrangement', [
    'tilesArrangement.arrangementGenerator',
    'tilesArrangement.arrangementPicture',
    'bathroomShape'
])

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

    .directive('tilesArrangement', function (ArrangementPictureCreator, BathroomShape) {


        var scope;
        var canvas;
        var arrangement;
        var arrangementPicture;
        var sourceRowToSwap, sourceColumnToSwap;

        function link(_scope_, _element_) {
            scope = _scope_;
            _element_.on("click", toggleSwappingTiles);
            canvas = _element_[0];
            scope.$watch('arrangement', updateCanvas);
            scope.$watch('shouldShowTilesLabels', updateCanvas);
        }

        function toggleSwappingTiles(event) {
            var column = arrangementPicture.columnAt(event.offsetX);
            var row = arrangementPicture.rowAt(event.offsetY);
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
            arrangementPicture = ArrangementPictureCreator.newPictureFor(arrangement, BathroomShape);
            if (!!arrangementPicture) {
                resetCanvas();
                loadImages();
            }
        }

        function resetCanvas() {
            canvas.width = arrangementPicture.width();
            canvas.height = arrangementPicture.height();
            context2d().fillStyle = "#FFFFFF";
            context2d().fillRect(0, 0, canvas.width, canvas.height);
        }

        function loadImages() {
            arrangementPicture.loadImagesAndThen(function (images) {
                drawTilesUsing(images);
                drawBathroomShape();
            });
        }

        function drawTilesUsing(images) {
            arrangementPicture.forEachTile(function (tileName, x, y, width, height, rotation) {
                var tileImage = images[tileName];
                context2d().save();
                context2d().translate(x + width / 2, y + height / 2);
                context2d().rotate(rotation);
                context2d().drawImage(tileImage, -width / 2, -height / 2, width, height);
                context2d().restore();
                if (shouldShowTilesLabels()) {
                    drawTileLabel(tileName, x + 2, y + 2);
                }
            });
        }

        function drawTileLabel(labelText, x, y) {
            context2d().save();
            context2d().font = "16px Arial";
            context2d().textBaseline = "top";
            const textXOffset = 2;
            const width = context2d().measureText(labelText).width + textXOffset;
            const height = 16;
            context2d().fillStyle = "#FFFFFF";
            context2d().fillRect(x, y, width, height);
            context2d().fillStyle = "#000000";
            context2d().fillText(labelText, x + textXOffset, y);
            context2d().restore();
        }

        function drawBathroomShape() {
            context2d().save();
            context2d().globalAlpha = 0.6;
            context2d().beginPath();
            context2d().strokeStyle = "#FF0000";
            context2d().lineWidth = 5;
            arrangementPicture.forEachLineInBathroomShape(drawLine);
            context2d().closePath();
            context2d().stroke();
            context2d().restore();
        }

        function drawLine(line) {
            context2d().moveTo(line.x1, line.y1);
            context2d().lineTo(line.x2, line.y2);
        }

        function highlightTileAt(row, column) {
            var rectangle = arrangementPicture.tileRectangleAt(row, column);
            context2d().save();
            context2d().globalAlpha = 0.4;
            context2d().fillStyle = "#999900";
            context2d().fillRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
            context2d().restore();
        }

        function context2d() {
            return canvas.getContext("2d");
        }

        function shouldShowTilesLabels() {
            return scope.shouldShowTilesLabels;
        }

        return {
            restrict: 'E',
            replace: true,
            template: '<canvas id="arrangement"></canvas>',
            link: link
        }
    });
