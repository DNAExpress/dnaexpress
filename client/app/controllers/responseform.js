'use strict';
angular.module('app.responseform', ['app.eventfactory'])

.controller('ResponseFormCtrl',['$scope', '$state', '$stateParams','$window', 'eventFactory',function($scope, $state, $stateParams, $window, eventFactory) {
  $scope.eventData = $stateParams.eventData;

  $scope.sendResponse = function(data) {
    console.log("sendResponse triggered")

    if ($scope.decline) {
      var response = {
        pubId:$scope.eventData.publicEventId,
        username:$window.sessionStorage.getItem('wefeast.user.username')
      }
      eventFactory.declineInvite(response);
    }
    else {
      $scope.responseform = {};

      var foodprefs = [];

      for (var key in data) {
        if (data[key]) {
          foodprefs.push(key);
        }
      }

      var responseData = {
        pubEventId:$scope.eventData.publicEventId,
        username:$window.sessionStorage.getItem('wefeast.user.username'),
        prefs:foodprefs,
        decline:0
      }

      eventFactory.sendEventResponse(responseData);
    }

  }
}]);
