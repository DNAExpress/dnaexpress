'use strict'
angular.module('app.createevent', ['app.services', 'app.eventfactory'])

.controller('CreateEventCtrl', ['$scope', '$state', 'userFactory', 'eventFactory', function($scope, $state, userFactory, eventFactory) {

  $scope.databinLeft = [{name:"Harry Rosenberg", location:"San Francisco"}, {name:"Cheryl Sherman", location:"Sacramento"}, {name:"Linda Burgess", location:"Oakland"}];
  $scope.databinRight = [{name:"Eliot Khuner", location:"Berkeley"}, {name:"Wes Carroll", location:"Berkeley"}, {name:"Mike Josepher", location:"Pacifica"}];

  $scope.guests = {};

  $scope.guestList = [];

  $scope.invited = eventFactory.guestList;

  $scope.getGuests = function() {
    for (var name in $scope.guests) {
      if ($scope.guests[name]) {
          $scope.guestList.push(name)
      }
    }
    console.log("guestlist", $scope.guestList);
    eventFactory.guestList = $scope.guestList;
    $state.go('dashboard.createevent')
  };

  $scope.submitEvent = function() {

    var eventData =  {
      date:$scope.event.date,
      creator:$scope.event.creator,
      name:$scope.event.name,
      attendees:eventFactory.guestList
    };

    eventFactory.createEvent(eventData)
    .then(function(response) {
      console.log("inside CreateEventCtrl, response received", response);
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
