angular.module('app.services', [])

.factory('userFactory', ['$http', function($http){

  var userReq = function(userdata){
    console.log('making request', userdata);
    $http({
      method:'POST',
      url: '/api/search',
      data: userdata
    }).then(function(res){
      console.log(res);
    });
  };

  return {
    userReq: userReq
  };
}]);
