angular.module('imageCache', ['imageCache.imageLoader'])

    .factory('ImageCache', function (ImageLoader, $q) {

        var imagesLoadPromises = [];

        function loadImageNamed(name) {
            if (isPromiseNotCached(name)) {
                cachePromise(name, ImageLoader.loadJpgImageNamed(name));
            }
            return cachedPromise(name);
        }

        function loadImagesNamed(names) {
            var promises = [];
            names.forEach(function (name) {
                promises.push(loadImageNamed(name));
            });
            return $q.all(promises);
        }

        function isPromiseNotCached(name) {
            return !imagesLoadPromises[name];
        }

        function cachePromise(name, promise) {
            imagesLoadPromises[name] = promise;
        }

        function cachedPromise(name) {
            return imagesLoadPromises[name];
        }

        return {
            loadImageNamed: loadImageNamed,
            loadImagesNamed: loadImagesNamed
        };

    });