'use strict';
angular.module('app.editprofile', ['app.services'])

.controller('EditProfileCtrl', ['$state','$scope', 'Profile', 'Auth', '$window', function($state, $scope, Profile, Auth, $window) {

  $scope.user = {};
  $scope.user.username = $window.sessionStorage.getItem('wefeast.user.username');
  $scope.user.firstname = $window.sessionStorage.getItem('wefeast.user.first');
  $scope.user.lastname = $window.sessionStorage.getItem('wefeast.user.last');
  $scope.user.location = $window.sessionStorage.getItem('wefeast.user.location');
  $scope.user.email = $window.sessionStorage.getItem('wefeast.user.email');
  console.log($scope.user);

  $scope.activate = function(formdata) {
    var profileData = Profile.processData($scope.user, formdata);
    Profile.sendEditProfile(profileData);
  }
}])
