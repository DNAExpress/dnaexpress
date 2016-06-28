'use strict';
angular.module('app.createprofile', ['app.services'])

.controller('CreateProfileCtrl', ['$scope', '$state', '$stateParams','Auth', 'Profile', '$window',function($scope, $state, $stateParams, Auth, Profile, $window) {

  $scope.user = {};
  $scope.user.username = $window.sessionStorage.getItem('wefeast.user.username');
  $scope.user.firstname = $window.sessionStorage.getItem('wefeast.user.first');
  $scope.user.lastname = $window.sessionStorage.getItem('wefeast.user.last');
  $scope.user.location = $window.sessionStorage.getItem('wefeast.user.location');
  $scope.user.email = $window.sessionStorage.getItem('wefeast.user.email');

  $scope.activate = function(formData) {
    var profileData = Profile.processData($scope.user, formData);
    Profile.sendCreateProfile(profileData);
  };

}])
