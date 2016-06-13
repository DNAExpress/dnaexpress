'use strict';
angular.module('app.editprofile', ['app.services'])

.controller('EditProfileCtrl', ['$state','$scope', 'Profile', function($state, $scope, Profile) {

  $scope.activate = function(formdata) {
    console.log("clicked")
    Profile.processData(formdata);
    $state.go('dashboard.createevent')
  }
}])
