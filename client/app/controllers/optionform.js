'use strict'
angular.module('app.optionform', ['app.services'])

.controller('OptionformCtrl', ['$scope', '$location', 'userFactory', function($scope, $location, userFactory){
  $scope.userReq = function() {
    userFactory.userReq($scope.user);
  }
}]);
