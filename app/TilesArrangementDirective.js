var randomTiles = angular.module('randomTiles');

randomTiles.directive('tilesArrangement', function () {

    var context2d;
    var scope;

    function link(_scope_, _element_) {
        scope = _scope_;
        context2d = _element_[0].getContext("2d");
        scope.$watch('arrangement', updateCanvas);
    }

    function updateCanvas() {
        if (scope.arrangement) {
            var tileImage = new Image();
            tileImage.src = "assets/img/" + scope.arrangement.tile + ".jpg";
            tileImage.onload = function () {
                context2d.drawImage(tileImage, 0, 0, 100, 100);
            };
        }
    }

    return {
        restrict: 'E',
        replace: true,
        template: '<canvas id="arrangement"></canvas>',
        link: link
    }
});


