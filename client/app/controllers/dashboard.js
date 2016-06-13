'use strict'
angular.module('app.dashboard', ['app.services'])

.controller('DashboardCtrl', ['$scope', '$state', 'Auth', function($scope, $state, Auth){
  $scope.signout = function () {
    Auth.signout();
    // $state.go('main.buttons');
  }
}]);
