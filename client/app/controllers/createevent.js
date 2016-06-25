'use strict'
angular.module('app.createevent', ['app.services', 'app.eventfactory'])

.controller('CreateEventCtrl', ['$scope', '$state', '$window','userFactory', 'eventFactory', function($scope, $state, $window, userFactory, eventFactory) {

  $scope.databinLeft = eventFactory.databinLeft;
  $scope.databinRight = eventFactory.databinRight;

  $scope.allUsersList;

  $scope.guests = {};

  $scope.eventData = eventFactory.eventData;

  $scope.getGuests = function() {
    $scope.allUsersList = JSON.parse($window.sessionStorage.getItem('wefeast.userList'));
    eventFactory.eventData["attendees"] = [];
    for (var guest in $scope.guests) {
      for (var users in $scope.allUsersList) {
        if (users === guest) {
          eventFactory.eventData["attendees"].push($scope.allUsersList[users]);
        }
      }
    }
    $state.go('dashboard.createeventreview')
  };

  $scope.collectEventData = function() {
    eventFactory.eventData["eventName"] = $scope.event.name;
    eventFactory.eventData["creator"] = $scope.event.creator;
    eventFactory.eventData["date"] = $scope.event.date;
    $state.go('dashboard.guestlist')
    .then(function() {
      $scope.allUsersList = JSON.parse($window.sessionStorage.getItem('wefeast.userList'));
      $scope.databinLeft = [];
      $scope.databinRight = [];
      eventFactory.distributeGuestList($scope.allUsersList);
    })
  };

  $scope.submitEvent = function() {
    eventFactory.createEvent(eventFactory.eventData)
    .then(function(response) {
      $state.go('dashboard.showevent');
    })
  };

}]);
