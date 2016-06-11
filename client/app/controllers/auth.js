'use strict'
angular.module('app.auth', ['app.services'])

.controller('AuthCtrl', ['$scope', '$state', 'Auth', function($scope, $state, Auth){
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

  $scope.signup = function () {
    Auth.signup($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('com.app', token);
        $state.go('dashboard');
      })
      .catch(function (error) {
        console.error(error);
      });
  };
}])
