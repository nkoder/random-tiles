var randomTiles = angular.module('randomTiles');

randomTiles.directive('tilesArrangement', function () {

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
            canvas.width = arrangement.size.width * scale;
            canvas.height = arrangement.size.height * scale;
            arrangement.tiles.forEach(function (tile) {
                var tileImage = new Image();
                tileImage.src = "assets/img/" + tile.name + ".jpg";
                tileImage.onload = function () {
                    var x = arrangement.tileSize.width * (tile.cell.column - 1) * scale;
                    var y = arrangement.tileSize.height * (tile.cell.row - 1) * scale;
                    var width = arrangement.tileSize.width * scale;
                    var height = arrangement.tileSize.height * scale;
                    var context2d = canvas.getContext("2d");
                    context2d.drawImage(tileImage, x, y, width, height);
                };
            });
        }
    }

    return {
        restrict: 'E',
        replace: true,
        template: '<canvas id="arrangement"></canvas>',
        link: link
    }
});


