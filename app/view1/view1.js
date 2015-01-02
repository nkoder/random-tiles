'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', [function($scope) {
      $scope.tilesRows = [
        {
          tiles: [
            {
              typeId: 1
            },
            {
              typeId: 2
            }
          ]
        },
        {
          tiles: [
            {
              typeId: 3
            },
            {
              typeId: 4
            }
          ]
        }
      ];
}]);