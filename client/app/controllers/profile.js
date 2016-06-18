'use strict';
angular.module('app.profile',['app.services'])

.controller('ProfileCtrl', ['$scope','$state', '$window', function ($scope, $state, $window) {
  $scope.user = {};
  $scope.user.username = $window.sessionStorage.getItem('wefeast.user.username');
  $scope.user.firstname = $window.sessionStorage.getItem('wefeast.user.first');
  $scope.user.lastname = $window.sessionStorage.getItem('wefeast.user.last');
  $scope.user.location = $window.sessionStorage.getItem('wefeast.user.location');
  $scope.user.email = $window.sessionStorage.getItem('wefeast.user.email');

}])
