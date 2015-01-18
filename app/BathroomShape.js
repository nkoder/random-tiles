angular
    .module('randomTiles')
    .factory('BathroomShape', function () {

        var coordinates = new Coordinates();
        coordinates.ofNextVerticalLineOfLength(110);
        var lines = [
            coordinates.ofNextHorizontalLineOfLength(1710),
            coordinates.ofNextVerticalLineOfLength(1290),
            coordinates.ofNextHorizontalLineOfLength(-100),
            coordinates.ofNextVerticalLineOfLength(800),
            coordinates.ofNextHorizontalLineOfLength(-510),
            coordinates.ofNextVerticalLineOfLength(365),
            coordinates.ofNextHorizontalLineOfLength(-70),
            coordinates.ofNextVerticalLineOfLength(160),
            coordinates.ofNextHorizontalLineOfLength(680),
            coordinates.ofNextVerticalLineOfLength(1260),
            coordinates.ofNextHorizontalLineOfLength(-1710),
            coordinates.ofNextVerticalLineOfLength(-1260),
            coordinates.ofNextHorizontalLineOfLength(105),
            coordinates.ofNextVerticalLineOfLength(-160),
            coordinates.ofNextHorizontalLineOfLength(-105),
            coordinates.ofNextVerticalLineOfLength(-2455)
        ];

        function Coordinates() {
            var currentX = 0;
            var currentY = 0;
            return {
                ofNextHorizontalLineOfLength: function (length) {
                    var line = {
                        x1: currentX,
                        y1: currentY,
                        x2: currentX + length,
                        y2: currentY
                    };
                    currentX = currentX + length;
                    return line;
                },
                ofNextVerticalLineOfLength: function (length) {
                    var line = {
                        x1: currentX,
                        y1: currentY,
                        x2: currentX,
                        y2: currentY + length
                    };
                    currentY = currentY + length;
                    return line;
                }
            }
        }

        return {
            lines: function () {
                return lines;
            }
        };

    });