angular.module('app.services', [])

.factory('userFactory', ['$http', '$state', function ($http, $state) {

  var userReq = function (userdata) {
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

.factory('restaurantFactory', [function () {
  var restaurants;

  return {
    restaurants: restaurants
  }
}])

.factory('Auth', ['$http', '$state', function ($http, $state, $window) {

  var signin = function (userdata) {
    return $http({
      method: 'POST',
      url: '/api/users/signin',
      data: userdata
    })
    .then(function (res) {
      return res.data.token;
    });
  };

  var isAuth = function () {
    return !!$window.localStorage.getItem('com.shortly');
  };

  var signup = function (userdata) {
    console.log(userdata);
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: userdata
    })
    .then(function (res) {
      return res.data.token;
    });
  };

  var signout = function () {
    $window.localStorage.removeItem('com.app');
    $state.go('main');
  };

  return {
    signin: signin,
    signup: signup,
    isAuth: isAuth,
    signout: signout
  };
}]);
