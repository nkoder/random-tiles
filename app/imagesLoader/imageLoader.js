angular.module('imagesLoader', [])

    .factory('ImagesLoader', function () {

        function loadJpgImage(name, callback) {
            var image = new Image();
            image.src = "assets/img/" + name + ".jpg";
            image.onload = function () {
                callback(image);
            }
        }

        return {
            loadJpgImageNamed: loadJpgImage
        };

    });