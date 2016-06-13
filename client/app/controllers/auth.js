'use strict'
angular.module('app.auth', ['app.services'])

.controller('AuthCtrl', ['$scope', '$state', 'Auth', '$window', function($scope, $state, Auth, $window){
  $scope.signin = function () {
    console.log('inside signin authctrl');
    Auth.signin($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('com.app', token);
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
