'use strict';
angular.module('app.friend', ['app.friendservices'])

.controller('FriendCtrl', ['$scope', 'FriendFactory', function ($scope, FriendFactory) {

  $scope.databin = FriendFactory.searchResponseData;
  $scope.databinLeft = ["Abraham Lincoln", "George Washington", "Randall Pink Floyd", "Bo Yao"];
  $scope.databinRight = ["Bill S. Preston, esq.", "Ted Theodore Logan", "Peter Parker", "Rico Chen"];

  $scope.lookup = function() {
    FriendFactory.search($scope.search.target);
  }


}])
