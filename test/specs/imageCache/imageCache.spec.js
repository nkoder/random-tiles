describe('imageCache', function () {

    beforeEach(module('imageCache'));

    describe('ImageCache should', function () {

        var ImageCache;
        var ImageLoader;
        var $q;
        var $rootScope;

        beforeEach(inject(function (_ImageCache_, _ImageLoader_, _$q_, _$rootScope_) {
            ImageCache = _ImageCache_;
            ImageLoader = _ImageLoader_;
            $q = _$q_;
            $rootScope = _$rootScope_;
        }));

        it("provide image with given name", function () {
            // given:
            var imageProvidedByLoader = "some image";
            var cachedImage = undefined;
            var deferredImageLoading = newDeferredAction();
            spyOn(ImageLoader, "loadJpgImageNamed").and.returnValue(deferredImageLoading.promise);

            // when:
            ImageCache.loadImageNamed("image_name").then(function (image) {
                cachedImage = image;
            });
            fulfillPromiseOf(deferredImageLoading).withImage(imageProvidedByLoader);

            // then:
            expect(cachedImage).toBe(imageProvidedByLoader);
        });

        it("provide same image next time without loading it again", function () {
            // given:
            var deferredImageLoading = newDeferredAction();
            var loadingCount = 0;
            spyOn(ImageLoader, "loadJpgImageNamed").and.callFake(function () {
                loadingCount++;
                return deferredImageLoading.promise;
            });

            // when:
            ImageCache.loadImageNamed("image_name");
            ImageCache.loadImageNamed("image_name");
            fulfillPromiseOf(deferredImageLoading).withImage("some image");

            // then:
            expect(loadingCount).toEqual(1);
        });

        function newDeferredAction() {
            return $q.defer();
        }

        function fulfillPromiseOf(deferredImageLoading) {
            return {
                withImage: function (image) {
                    deferredImageLoading.resolve(image);
                    $rootScope.$digest();
                }
            }
        }

    });
});