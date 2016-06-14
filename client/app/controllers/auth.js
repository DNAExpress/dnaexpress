'use strict'
angular.module('app.auth', ['app.services'])

.controller('AuthCtrl', ['$scope', '$state', 'Auth', 'Profile',function($scope, $state, Auth, Profile){
  $scope.signin = function () {
    Auth.signin($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('com.app', token);
        $state.go('dashboard');
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  $scope.advanceToFoodPrefs = function() {
    $state.go('main.createprofile', {user:$scope.user})
  }
  $scope.signup = function () {
    Process.profile($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('com.app', token);
        $state.go('main.createprofile');
      })
      .catch(function (error) {
        console.error(error);
      });
  };
}])
