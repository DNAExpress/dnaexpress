'use strict';
angular.module('app.profile',['app.services'])

.controller('ProfileCtrl', ['$scope','$state', '$window', function ($scope, $state, $window) {

  var prefs = JSON.parse($window.sessionStorage.getItem('wefeast.user.preferences'));
  var prefsList = "";
  for (var i = 0; i < prefs.length; i++) {
    prefsList = prefsList + prefs[i]+", ";
  }

  if (!prefsList) {
    prefsList = "none";
  }
  else {
    prefsList = prefsList.slice(0, -2);
  }

  var restrictions = JSON.parse($window.sessionStorage.getItem('wefeast.user.dietrestrictions'));
  var restrictionsList = "";
  for (var i = 0; i < restrictions.length; i++) {
    restrictionsList = restrictionsList + restrictions[i]+", ";
  }
  if (!restrictionsList) {
    restrictionsList = "none";
  }
  else {
    restrictionsList = restrictionsList.slice(0, -2);
  }

  $scope.user = {};
  $scope.user.username = $window.sessionStorage.getItem('wefeast.user.username');
  $scope.user.firstname = $window.sessionStorage.getItem('wefeast.user.first');
  $scope.user.lastname = $window.sessionStorage.getItem('wefeast.user.last');
  $scope.user.location = $window.sessionStorage.getItem('wefeast.user.location');
  $scope.user.email = $window.sessionStorage.getItem('wefeast.user.email');
  $scope.user.preferences = prefsList;
  $scope.user.dietrestrictions = restrictionsList;


}])
