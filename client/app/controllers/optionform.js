'use strict'
angular.module('app.optionform', ['app.services'])

.controller('OptionformCtrl', ['$scope', '$location', '$state', 'userFactory', 'restaurantFactory', function($scope, $location, $state, userFactory, restaurantFactory){

  $scope.getUserReq = function() {
    $state.go('dashboard.loading');
    userFactory.userReq($scope.user).then(function(res){
      restaurantFactory.restaurants = res.data.slice(0, 11);
      console.log(restaurantFactory.restaurants);
      $state.go('dashboard.restaurantResults');
    });
  }
}]);
