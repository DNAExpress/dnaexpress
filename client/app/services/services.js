angular.module('app.services', [])

.factory('userFactory', ['$http', '$state', function ($http, $state) {

  var userReq = function (userdata) {
    return $http({
      method:'POST',
      url: '/api/search',
      data: userdata
    })
    .then(function(res){
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

.factory('Auth', ['$http', '$state', '$window', function ($http, $state, $window) {

  var signin = function (userdata) {
    return $http({
      method: 'POST',
      url: '/api/users/signin',
      data: userdata
    })
    .then(function (res) {
      return res.data.token;
    })
    .catch(function (error) {
      console.error(error);
    });
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
    })
    .catch(function (error) {
      console.error(error);
    });
  };

  var isAuth = function () {
    return !!$window.localStorage.getItem('com.app');
  };

  var signout = function () {
    $window.localStorage.removeItem('com.app');
  };

  return {
    signin: signin,
    signup: signup,
    isAuth: isAuth,
    signout: signout
  };
}]);
