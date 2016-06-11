angular.module('app.restaurantresults', [])

.controller('RestaurantResultsCtrl', ['$scope', 'restaurantFactory', function($scope, restaurantFactory) {
  $scope.data = {
    restaurants: restaurantFactory.restaurants
  }

}]);
