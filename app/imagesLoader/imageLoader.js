angular.module('imagesLoader', [])

    .factory('ImagesLoader', function ($q) {

        function loadJpgImageNamed(name) {
            var image = new Image();
            image.src = "assets/img/" + name + ".jpg";
            return $q(function (onLoaded) {
                image.onload = function () {
                    onLoaded(image);
                }
            });
        }

        return {
            loadJpgImageNamed: loadJpgImageNamed
        };

    });