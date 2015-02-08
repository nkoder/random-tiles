describe('tilesArrangement.arrangementPicture', function () {

    beforeEach(module('tilesArrangement.arrangementPicture'));


    describe('ArrangementPictureCreator should', function () {

        var ArrangementPictureCreator;

        beforeEach(inject(function (_ArrangementPictureCreator_) {
            ArrangementPictureCreator = _ArrangementPictureCreator_;
        }));

        it("create picture for arrangement", function () {
            // given:
            var arrangement = "some arrangement";

            // when:
            var picture = ArrangementPictureCreator.newPictureOf(arrangement);

            // then:
            expect(picture).toBeDefined();
        });

        it("not create picture for undefined arrangement", function () {
            // given:
            var arrangement = undefined;

            // when:
            var picture = ArrangementPictureCreator.newPictureOf(arrangement);

            // then:
            expect(picture).not.toBeDefined();
        });

    });

    describe('ArrangementPicture should', function () {

        const scale = 0.5;
        const rows = 2;
        const columns = 3;
        const tileWidth = 4;
        const tileHeight = 5;
        const groutWidth = 1;

        var ArrangementPictureCreator;
        var ArrangementGenerator;

        beforeEach(module('tilesArrangement.arrangementGenerator'));

        beforeEach(inject(function (_ArrangementPictureCreator_, _ArrangementGenerator_) {
            ArrangementPictureCreator = _ArrangementPictureCreator_;
            ArrangementGenerator = _ArrangementGenerator_;
        }));

        it("return scaled size of arrangement", function () {
            // given:
            var arrangement = newArrangementFor(rows, columns, tileWidth, tileHeight, groutWidth);
            var picture = ArrangementPictureCreator.newPictureOf(arrangement);

            // then:
            expect(picture.width()).toBe(scale * (columns * (tileWidth + groutWidth)));
            expect(picture.height()).toBe(scale * (rows * (tileHeight + groutWidth)));
        });

        function newArrangementFor(rows, columns, tileInnerWidth, tileInnerHeight, groutWidth) {
            return ArrangementGenerator.newArrangementFor(rows || 2, columns || 3, tileInnerWidth || 4,
                tileInnerHeight || 5, groutWidth || 1);
        }

    });
});