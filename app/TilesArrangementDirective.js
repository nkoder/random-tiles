var randomTiles = angular.module('randomTiles');

randomTiles.directive('tilesArrangement', function () {

    const scale = 0.5;

    var context2d;
    var scope;

    function link(_scope_, _element_) {
        scope = _scope_;
        context2d = _element_[0].getContext("2d");
        scope.$watch('arrangement', updateCanvas);
    }

    function updateCanvas() {
        var arrangement = scope.arrangement;
        if (arrangement) {
            arrangement.tiles.forEach(function (tile) {
                var tileImage = new Image();
                tileImage.src = "assets/img/" + tile.name + ".jpg";
                tileImage.onload = function () {
                    var x = tile.width * (tile.cell.column - 1) * scale;
                    var y = tile.height * (tile.cell.row - 1) * scale;
                    var width = tile.width * scale;
                    var height = tile.height * scale;
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


