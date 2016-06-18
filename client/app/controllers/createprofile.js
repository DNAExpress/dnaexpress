'use strict';
angular.module('app.createprofile', ['app.services'])

.controller('CreateProfileCtrl', ['$scope', '$state', '$stateParams','Auth', 'Profile', function($scope, $state, $stateParams, Auth, Profile) {

  $scope.user = $stateParams.user;

  $scope.activate = function(formData) {
    // angular.extend($scope.user,formData);
    // var profile = Profile.processData($scope.user);
    // Auth.signup(profile);
    // Auth.userData = $scope.user;
    $state.go('dashboard.createevent');
  };

}])
