'use strict';
angular.module('app.createevent', ['app.services', 'app.eventfactory'])

.controller('CreateEventCtrl', ['$scope', '$state', '$window','userFactory', 'eventFactory', function($scope, $state, $window, userFactory, eventFactory) {

  $scope.databinLeft = eventFactory.databinLeft;
  $scope.databinRight = eventFactory.databinRight;

  $scope.allUsersList;

  $scope.guests = {};

  $scope.event = {};

  $scope.event.creator = $window.sessionStorage.getItem('wefeast.user.username');

  $scope.eventData = eventFactory.eventData;

  $scope.possible = "";

  $scope.guestbin = [];

  $scope.addToGuestList = function(username) {

    if ($scope.guestbin.indexOf(username) < 0) {
      $scope.possible = "";
      $scope.guestbin.push(username);
      $scope.guestbin.forEach(function(name) {
        $scope.possible += name +", ";
      })
    }
  };

  $scope.addGuestsToEventData = function() {
    eventFactory.eventData["attendees"] = $scope.guestbin;
    $state.go('dashboard.createeventreview')
    .then(function(){
      console.log($scope.guestbin);
    })
  };

  $scope.collectEventData = function() {
    eventFactory.eventData["eventName"] = $scope.event.name;
    eventFactory.eventData["creator"] = $scope.event.creator;
    eventFactory.eventData["date"] = $scope.event.date;
    $state.go('dashboard.guestlist')
    .then(function() {
      if (eventFactory.databinLeft.length === 0 && eventFactory.databinRight.length === 0) {
        $scope.allUsersList = JSON.parse($window.sessionStorage.getItem('wefeast.userList'));
        $scope.databinLeft = [];
        $scope.databinRight = [];
        eventFactory.distributeGuestList($scope.allUsersList);
      }
    })
  };

  $scope.submitEvent = function() {
    eventFactory.createEvent(eventFactory.eventData)
  };

}]);
