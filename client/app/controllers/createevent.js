'use strict'
angular.module('app.createevent', ['app.services'])

.controller('CreateEventCtrl', ['$scope', 'userFactory', function($scope, userFactory){
  $scope.searchresults = [];

  $scope.search = function () {
    console.log("clicked");
    var searchParams = {
      opt1:$scope.formdata.searchTerm,
      location:$scope.formdata.location
    };
    console.log(searchParams)
    userFactory.userReq(searchParams)
    .then (function(response) {
      console.log(response)
      $scope.searchresults = response.data.slice(0, 8);
      console.log($scope.searchresults);
    })
  };

}]);
