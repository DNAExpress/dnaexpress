angular.module('app.services', [])

.factory('userFactory', ['$http', '$location', function($http, $state){

  var userReq = function(userdata){
    console.log('making request', userdata);
    $http({
      method:'POST',
      url: '/api/search',
      data: userdata
    }).then(function(res){
      $state.go('/recommendation');
      console.log(res);
    });

  };

  return {
    userReq: userReq
  };
}]);
