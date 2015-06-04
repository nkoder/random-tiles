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

        it("provide scaled size of arrangement", function () {
            // given:
            var arrangement = newArrangementFor(rows, columns, tileWidth, tileHeight, groutWidth);
            var picture = ArrangementPictureCreator.newPictureOf(arrangement);

            // then:
            expect(picture.width()).toEqual(scale * (columns * (tileWidth + groutWidth)));
            expect(picture.height()).toEqual(scale * (rows * (tileHeight + groutWidth)));
        });

        it("provide cell at given coordinates", function () {
            // given:
            var arrangement = newArrangementFor(rows, columns, tileWidth, tileHeight, groutWidth);
            var picture = ArrangementPictureCreator.newPictureOf(arrangement);
            var cellWidth = tileWidth + groutWidth;
            var cellHeight = tileHeight + groutWidth;

            // then:
            expect(picture.cellAt(scale * cellWidth * 0.5, scale * cellHeight * 0.5))
                .toEqual({row: 1, column: 1});
            expect(picture.cellAt(scale * cellWidth * 1.5, scale * cellHeight * 0.5))
                .toEqual({row: 1, column: 2});
            expect(picture.cellAt(scale * cellWidth * 0.5, scale * cellHeight * 1.5))
                .toEqual({row: 2, column: 1});
        });

        it("provide rectangle coordinates in given cell", function () {
            // given:
            var arrangement = newArrangementFor(rows, columns, tileWidth, tileHeight, groutWidth);
            var picture = ArrangementPictureCreator.newPictureOf(arrangement);

            // then:
            expect(picture.rectangleIn({row: 1, column: 1}))
                .toEqual({
                    x: scale * groutWidth,
                    y: scale * groutWidth,
                    width: scale * tileWidth,
                    height: scale * tileHeight
                });
            expect(picture.rectangleIn({row: 2, column: 1}))
                .toEqual({
                    x: scale * groutWidth,
                    y: scale * (tileHeight + 2 * groutWidth),
                    width: scale * tileWidth,
                    height: scale * tileHeight
                });
            expect(picture.rectangleIn({row: 1, column: 2}))
                .toEqual({
                    x: scale * (tileWidth + 2 * groutWidth),
                    y: scale * groutWidth,
                    width: scale * tileWidth,
                    height: scale * tileHeight
                });
        });

        function newArrangementFor(rows, columns, tileInnerWidth, tileInnerHeight, groutWidth) {
            return ArrangementGenerator.newArrangementFor(rows || 2, columns || 3, tileInnerWidth || 4,
                tileInnerHeight || 5, groutWidth || 1);
        }

    });
});