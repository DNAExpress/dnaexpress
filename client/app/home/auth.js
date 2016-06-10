'use strict'
angular.module('app.auth', [])

.controller('AuthCtrl', ['$scope', '$location', function($scope, $location){
  $scope.login = function(){
    $location.path('/dashboard');
    return;
  };
}])
