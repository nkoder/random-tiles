angular.module('imageCache', ['imageCache.imageLoader'])

    .factory('ImageCache', function (ImageLoader) {

        var imagesLoadPromises = [];

        function loadImageNamed(name) {
            if (isPromiseNotCached(name)) {
                cachePromise(name, ImageLoader.loadJpgImageNamed(name));
            }
            return cachedPromise(name);
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
            loadImageNamed: loadImageNamed
        };

    });