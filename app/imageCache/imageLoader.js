angular.module('imageCache.imageLoader', [])

    .factory('ImageLoader', function ($q, $log) {


        function loadJpgImageNamed(name) {
            return $q(function (onImageLoaded) {
                var image = newImageNamed(name);
                image.onload = function () {
                    onImageLoaded(image);
                };
            });
        }

        function newImageNamed(name) {
            var source = "assets/img/" + name + ".jpg";
            $log.info("Loading image '" + source + "'");
            var image = new Image();
            image.src = source;
            return image;
        }

        return {
            loadJpgImageNamed: loadJpgImageNamed
        };

    });