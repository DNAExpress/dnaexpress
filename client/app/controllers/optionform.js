'use strict'
angular.module('app.optionform', ['app.services'])

.controller('OptionformCtrl', ['$scope', '$location', '$state', 'userFactory', function($scope, $location, $state, userFactory){
  $scope.userReq = function() {
    $state.go('dashboard.loading');
    userFactory.userReq($scope.user);
  }
}]);
