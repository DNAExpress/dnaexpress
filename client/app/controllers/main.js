angular.module('app.main', ['app.services'])

.controller('MainCtrl', ['$scope', '$state', 'Auth', function($scope, $state, Auth){

  $scope.userIsLive = false;

  $scope.userClicked = function() {
    $scope.userIsLive = true;
  };

}]);
