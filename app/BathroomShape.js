angular
    .module('randomTiles')
    .factory('BathroomShape', function () {

        var mainLines = initMainLinesFrom(0, 110);
        var showerLines = initShowerLinesFrom(1800, 200);

        function initMainLinesFrom(startX, startY) {
            var coordinates = new Coordinates(startX, startY);
            return [
                coordinates.ofNextHorizontalLineOfLength(1710),
                coordinates.ofNextVerticalLineOfLength(1290),
                coordinates.ofNextHorizontalLineOfLength(-110),
                coordinates.ofNextVerticalLineOfLength(800),
                coordinates.ofNextHorizontalLineOfLength(-500),
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
        }

        function initShowerLinesFrom(startX, startY) {
            var coordinates = new Coordinates(startX, startY);
            return [
                coordinates.ofNextHorizontalLineOfLength(400),
                coordinates.ofNextVerticalLineOfLength(800),
                coordinates.ofNextHorizontalLineOfLength(-400),
                coordinates.ofNextVerticalLineOfLength(-800),
            ];
        }

        function Coordinates(startX, startY) {
            var currentX = startX;
            var currentY = startY;
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
            mainLines: function () {
                return mainLines;
            },
            showerLines: function () {
                return showerLines;
            }
        };

    });