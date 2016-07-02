'use strict';
angular.module('app.createevent', ['app.services', 'app.eventfactory'])

.controller('CreateEventCtrl', ['$scope', '$state', '$window','userFactory', 'eventFactory', function($scope, $state, $window, userFactory, eventFactory) {

  $scope.databinLeft = [];
  $scope.databinRight = [];
  $scope.event = {};
  $scope.allUsersList = JSON.parse($window.sessionStorage.getItem('wefeast.userList'));
  $scope.event.creator = $window.sessionStorage.getItem('wefeast.user.username');

  var flag = "L";
  for(var user in $scope.allUsersList) {
    if (flag === "L") {
      $scope.databinLeft.push($scope.allUsersList[user]);
      flag = "R";
    }
    else {
      $scope.databinRight.push($scope.allUsersList[user]);
      flag = "L";
    }
  }

  $scope.guests = {};

  $scope.eventData = eventFactory.eventData;

  $scope.guestbin = [];

  $scope.addToGuestList = function(username) {
    if ($scope.guestbin.indexOf(username) < 0) {
      $scope.guestbin.push(username);
    }
  };

  $scope.removeFromGuestList = function(name) {
    if ($scope.guestbin.indexOf(name) > -1) {
      $scope.guestbin.splice($scope.guestbin.indexOf(name), 1);
    }
  };

  $scope.addGuestsToEventData = function() {
    eventFactory.eventData["attendees"] = $scope.guestbin;
    $state.go('dashboard.createeventreview');
  };

  $scope.collectEventData = function() {
    eventFactory.eventData["eventName"] = $scope.event.name;
    eventFactory.eventData["creator"] = $scope.event.creator;
    eventFactory.eventData["date"] = $scope.event.date;
    eventFactory.eventData["location"] = $scope.event.location;
    $state.go('dashboard.guestlist');
  };

  $scope.submitEvent = function() {
    eventFactory.createEvent(eventFactory.eventData);
  };

}]);
