angular.module('app.main', ['app.services'])

.controller('mainCtrl', ['$scope', '$state', 'Auth', function($scope, $state, Auth){
  $scope.signout = function () {
    var promise = Promise.promisify('Auth.signout');
    return promise()
      .then(function(){
        $state.go('main');
      });
  }
}]);
