angular.module('app.services', [])

.factory('userFactory', ['$http', '$state', function($http, $state){

  var userReq = function(userdata){
    return $http({
      method:'POST',
      url: '/api/search',
      data: userdata
    }).then(function(res){
      console.log(res.data[0]);
      return res;
    });
  };

  return {
    userReq: userReq
  };
}])

.factory('restaurantFactory', [function(){
  var restaurants;

  return {
    restaurants: restaurants
  }
}]);
