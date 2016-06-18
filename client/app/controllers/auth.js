'use strict'
angular.module('app.auth', ['app.services'])

.controller('AuthCtrl', ['$scope', '$state', '$window', 'Auth', 'Profile',function($scope, $state, $window, Auth, Profile){
  $scope.reset = function(form) {
    if (form) {
      form.$setPristine();
      form.$setUntouched();
    }
  }
  $scope.signin = function () {
    Auth.signin($scope.user)
      .then(function (response) {
        if (response.token) {
          $window.localStorage.setItem('com.app', response.token);
          $state.go('dashboard.showevent');
        }
        else {
          alert("email / password not recognized")
          $scope.reset();
          $state.go('main.signin');
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  $scope.advanceToFoodPrefs = function() {
    $state.go('main.createprofile', {user:$scope.user})
  };

  $scope.signup = function () {
    var data = Profile.processData($scope.user);
    console.log(data)
    Auth.signup(data)
      .then(function (token) {
        console.log("token received ",token)
        $window.localStorage.setItem('com.app', token);
        $state.go('main.createprofile', {user:$scope.user});
      })
      .catch(function (error) {
        console.error(error);
      });
  };

}])
