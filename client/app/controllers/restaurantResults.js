angular.module('app.restaurantresults', [])

.controller('RestaurantResultsCtrl', ['$scope', 'restaurantFactory', function($scope, restaurantFactory) {
  $scope.data = {
    restaurants: restaurantFactory.restaurants
  }
<<<<<<< f7963223e3f192ccc2fd821907d42c3c7bf1a752
=======

  $scope.logger = function() {
    console.log('hit');
  }
>>>>>>> [chore] change server to server root route; implement restaurant results

  $scope.logger = function() {
    console.log('hit');
  }

}]);
