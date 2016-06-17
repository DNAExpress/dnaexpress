angular.module('app.services', [])

.factory('userFactory', ['$http', '$state', function ($http, $state) {

  var userReq = function (userdata) {
    return $http({
      method:'POST',
      url: '/api/search',
      data: userdata
    })
    .then(function(res){
      console.log("inside userFactory ");
      return res;
    });
  };

  return {
    userReq: userReq
  };
}])

.factory('restaurantFactory', [function () {
  var restaurants;
  var databinLeft = [];
  var databinRight = [];
  return {
    restaurants: restaurants,
    databinLeft: databinLeft,
    databinRight: databinRight
  }
}])

.factory('Profile', ['$state', '$http', function ($state, $http) {

  var processData = function (formdata, $state) {

    var data = {
      username:formdata.username,
      firstname:formdata.firstname,
      lastname:formdata.lastname,
      email:formdata.email,
      password:formdata.password,
      location:formdata.location,
      restrictions:[],
      preferences:[]
    };

    for (var key in formdata) {
      if (typeof formdata[key] === "boolean") {
        if (key === "vegetarian" || key === "vegan" || key === "glutenFree" || key === "kosher") {
          data.restrictions.push(key)
        }
        else {
          data.preferences.push(key)
        }
      }
    };
    return data;
  };

  var sendEditProfile = function () {

  }
  return {
    processData: processData,
  };

}])

.factory('Auth', ['$http', '$state', '$window',function ($http, $state, $window) {

  var userData = {};
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
    console.log("inside Auth.signup, before http call",userdata)
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: userdata
    })
    .then(function (res) {
      $window.localStorage.setItem('com.app', res.data.token);
      $window.sessionStorage.setItem('wefeast.user.username', userdata.username);
      $window.sessionStorage.setItem('wefeast.user.first', userdata.firstname);
      $window.sessionStorage.setItem('wefeast.user.last', userdata.lastname);
      $window.sessionStorage.setItem('wefeast.user.location', userdata.location);
      $window.sessionStorage.setItem('wefeast.user.email', userdata.email);
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
    signout: signout,
    userData:userData
  };
}]);
