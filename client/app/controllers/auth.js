'use strict'
angular.module('app.auth', ['app.services', 'app.eventfactory'])

.controller('AuthCtrl', ['$scope', '$state', '$window', 'Auth', 'Profile', 'eventFactory',function($scope, $state, $window, Auth, Profile, eventFactory){
  $scope.reset = function(form) {
    if (form) {
      form.$setPristine();
      form.$setUntouched();
    }
  }
  $scope.signin = function () {
    Auth.signin($scope.user)
      .then(function (response) {
        console.log(response)
        if (response.data.token) {
          $window.localStorage.setItem('com.app', response.data.token);
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
    Auth.signup(data)
      .then(function (token) {
        $window.localStorage.setItem('com.app', token);
        $state.go('dashboard.createprofile', {user:$scope.user});
      })
      .catch(function (error) {
        console.error(error);
      });
  };

}])
