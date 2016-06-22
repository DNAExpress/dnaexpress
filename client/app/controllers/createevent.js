'use strict'
angular.module('app.createevent', ['app.services', 'app.eventfactory'])

.controller('CreateEventCtrl', ['$scope', '$state', 'userFactory', 'eventFactory', function($scope, $state, userFactory, eventFactory) {

  $scope.databinLeft = [{name:"Harry Rosenberg", location:"San Francisco"}, {name:"Cheryl Sherman", location:"Sacramento"}, {name:"Linda Burgess", location:"Oakland"}, {name:"Jessica Hedrick", location:"Chicago"}];
  $scope.databinRight = [{name:"Eliot Khuner", location:"Berkeley"}, {name:"Wes Carroll", location:"Berkeley"}, {name:"Mike Josepher", location:"Pacifica"}, {name:"Gerry O'Halloran", location:"Philadelphia"}];

  $scope.guests = {};

  $scope.guestList = [];

  $scope.eventData = eventFactory.eventData;

  $scope.getGuests = function() {
    for (var name in $scope.guests) {
      if ($scope.guests[name]) {
          $scope.guestList.push(name)
      }
    }
    eventFactory.eventData["attendees"] = $scope.guestList;
    $state.go('dashboard.createeventreview');
  };

  $scope.collectEventData = function() {
    eventFactory.eventData["eventName"] = $scope.event.name;
    eventFactory.eventData["creator"] = $scope.event.creator;
    eventFactory.eventData["date"] = $scope.event.date;
    $state.go('dashboard.guestlist');
  }

  $scope.submitEvent = function() {
    eventFactory.createEvent(eventFactory.eventData)
    .then(function(response) {
      $state.go('dashboard.showevent');
    })
  };

  // $scope.search = function () {
  //   console.log("clicked");
  //   var searchParams = {
  //     opt1:$scope.formdata.searchTerm,
  //     location:$scope.formdata.location
  //   };
  //   console.log(searchParams)
  //   userFactory.userReq(searchParams)
  //   .then (function(response) {
  //     console.log(response)
  //     $scope.searchresults = response.data.slice(0, 8);
  //     console.log($scope.searchresults);
  //   })
  // };

}]);
