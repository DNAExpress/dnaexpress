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

  var processData = function (userdata, formdata) {

    var data = {
      username:userdata.username,
      firstname:userdata.firstname,
      lastname:userdata.lastname,
      email:userdata.email,
      password:userdata.password,
      location:userdata.location,
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

  var sendEditProfile = function (userdata) {
    return $http({
      method:'POST',
      url:'/api/users/profile',
      data: userdata
    })
    .then(function(res){
      console.log("Inside Profile.sendEditProfile, response received", res);
      $state.go('dashboard.showevent');
    })

  }
  return {
    processData: processData,
    sendEditProfile: sendEditProfile
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
      console.log("inside signin, response received", res);
      $window.localStorage.setItem('com.app', res.data.token);
      $window.sessionStorage.setItem('wefeast.user.username', res.data.user.username);
      $window.sessionStorage.setItem('wefeast.user.first', res.data.user.firstname);
      $window.sessionStorage.setItem('wefeast.user.last', res.data.user.lastname);
      $window.sessionStorage.setItem('wefeast.user.location', res.data.user.location);
      $window.sessionStorage.setItem('wefeast.user.email', res.data.user.email);
      return res.data
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
      console.log("inside signup, response received",res)
      $window.localStorage.setItem('com.app', res.data.token);
      $window.sessionStorage.setItem('wefeast.user.username', res.data.user.username);
      $window.sessionStorage.setItem('wefeast.user.first', res.data.user.firstname);
      $window.sessionStorage.setItem('wefeast.user.last', res.data.user.lastname);
      $window.sessionStorage.setItem('wefeast.user.location', res.data.user.location);
      $window.sessionStorage.setItem('wefeast.user.email', res.data.user.email);
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
