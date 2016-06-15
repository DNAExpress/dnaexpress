'use strict';
angular.module('app.editprofile', ['app.services'])

.controller('EditProfileCtrl', ['$state','$scope', 'Profile', 'Auth', function($state, $scope, Profile, Auth) {

  $scope.user = Auth.userData;
  console.log($scope.user)

  $scope.activate = function(formdata) {
    Profile.processData(formdata);
    $state.go('dashboard.createevent')
  }
}])
