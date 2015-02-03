describe('bathroomShape', function () {

    beforeEach(module('randomTiles'));

    describe('BathroomShape', function () {

        var BathroomShape;

        beforeEach(inject(function (_BathroomShape_) {
            BathroomShape = _BathroomShape_;
        }));

        it("should define bathroom main shape", function () {
            // given:

            // when:
            var lines = BathroomShape.mainLines();

            // then:
            var nextFrom = new LinesIterator();
            expect(nextFrom(lines)).toEqual(lineFrom(0, 110).to(1710, 110));
            expect(nextFrom(lines)).toEqual(lineFrom(1710, 110).to(1710, 1400));
            expect(nextFrom(lines)).toEqual(lineFrom(1710, 1400).to(1600, 1400));
            expect(nextFrom(lines)).toEqual(lineFrom(1600, 1400).to(1600, 2200));
            expect(nextFrom(lines)).toEqual(lineFrom(1600, 2200).to(1100, 2200));
            expect(nextFrom(lines)).toEqual(lineFrom(1100, 2200).to(1100, 2565));
            expect(nextFrom(lines)).toEqual(lineFrom(1100, 2565).to(1030, 2565));
            expect(nextFrom(lines)).toEqual(lineFrom(1030, 2565).to(1030, 2725));
            expect(nextFrom(lines)).toEqual(lineFrom(1030, 2725).to(1710, 2725));
            expect(nextFrom(lines)).toEqual(lineFrom(1710, 2725).to(1710, 3985));
            expect(nextFrom(lines)).toEqual(lineFrom(1710, 3985).to(0, 3985));
            expect(nextFrom(lines)).toEqual(lineFrom(0, 3985).to(0, 2725));
            expect(nextFrom(lines)).toEqual(lineFrom(0, 2725).to(105, 2725));
            expect(nextFrom(lines)).toEqual(lineFrom(105, 2725).to(105, 2565));
            expect(nextFrom(lines)).toEqual(lineFrom(105, 2565).to(0, 2565));
            expect(nextFrom(lines)).toEqual(lineFrom(0, 2565).to(0, 110));
        });

        it("should define bathroom showe shape", function () {
            // given:

            // when:
            var lines = BathroomShape.showerLines();

            // then:
            var nextFrom = new LinesIterator();
            expect(nextFrom(lines)).toEqual(lineFrom(1800, 200).to(2200, 200));
            expect(nextFrom(lines)).toEqual(lineFrom(2200, 200).to(2200, 1000));
            expect(nextFrom(lines)).toEqual(lineFrom(2200, 1000).to(1800, 1000));
            expect(nextFrom(lines)).toEqual(lineFrom(1800, 1000).to(1800, 200));
        });

        function LinesIterator() {
            var nextIndex = 0;
            return function (lines) {
                var index = nextIndex;
                nextIndex += 1;
                return lines[index];
            }
        }

        function lineFrom(x1, y1) {
            return {
                to: function (x2, y2) {
                    return {
                        x1: x1,
                        y1: y1,
                        x2: x2,
                        y2: y2
                    };
                }
            }
        }

    });
});