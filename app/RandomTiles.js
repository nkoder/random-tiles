var randomTiles = angular.module('randomTiles', []);

randomTiles.directive('tilesArrangement', function () {
    return {
        restrict: 'E',
        scope: {
            phrase: "@phrase"
        },
        template: '<p>Let&rsquo;s start from beginning and make things {{phrase}}</p>'
    }
});

