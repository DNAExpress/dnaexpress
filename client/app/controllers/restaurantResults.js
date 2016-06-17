angular.module('app.restaurantresults', [])

.controller('RestaurantResultsCtrl', ['$scope', 'restaurantFactory', function($scope, restaurantFactory) {
  $scope.data = {
    restaurants: restaurantFactory.restaurants
  }
  $scope.databinLeft = restaurantFactory.databinLeft;
  $scope.databinRight = restaurantFactory.databinRight;

  console.log($scope.databinLeft);
  console.log($scope.databinRight);

  $scope.logger = function() {
    console.log('hit');
  }

}]);
