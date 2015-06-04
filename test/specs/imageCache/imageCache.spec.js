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
            var imageProvidedByLoader = {name: "image_name", image: "some image"};
            var deferredImageLoading = newDeferredAction();
            spyOn(ImageLoader, "loadJpgImageNamed").and.returnValue(deferredImageLoading.promise);
            var cachedImage = undefined;

            // when:
            ImageCache.loadImageNamed("image_name").then(function (namedImage) {
                cachedImage = namedImage;
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

        it("provide images with given names", function () {
            // given:
            var catImage = {name: "cat", image: "image of a cat"};
            var dogImage = {name: "dog", image: "image of a dog"};
            var deferredCatImageLoading = newDeferredAction();
            var deferredDogImageLoading = newDeferredAction();
            spyOn(ImageLoader, "loadJpgImageNamed").and.callFake(function (name) {
                if (name === "cat") {
                    return deferredCatImageLoading.promise;
                } else {
                    return deferredDogImageLoading.promise;
                }
            });
            var cachedNamedImages = [];

            // when:
            ImageCache.loadImagesNamed(["cat", "dog"]).then(function (images) {
                cachedNamedImages = images;
            });
            fulfillPromiseOf(deferredCatImageLoading).withImage(catImage);
            fulfillPromiseOf(deferredDogImageLoading).withImage(dogImage);

            // then:
            expect(cachedNamedImages.length).toEqual(2);
            expect(cachedNamedImages).toContain(catImage);
            expect(cachedNamedImages).toContain(dogImage);
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