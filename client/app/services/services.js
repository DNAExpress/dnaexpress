angular.module('app.services', ['app.eventfactory'])

.factory('userFactory', ['$http', '$state', function ($http, $state) {

  var userReq = function (userdata) {
    return $http({
      method:'POST',
      url: '/api/search',
      data: userdata
    })
    .then(function(res){
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

.factory('Profile', ['$state', '$http', '$window',function ($state, $http,$window) {

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
      console.log("editprofile response", res);
      $window.sessionStorage.setItem('wefeast.user.username', res.data.user.username);
      $window.sessionStorage.setItem('wefeast.user.first', res.data.user.firstname);
      $window.sessionStorage.setItem('wefeast.user.last', res.data.user.lastname);
      $window.sessionStorage.setItem('wefeast.user.location', res.data.user.location);
      $window.sessionStorage.setItem('wefeast.user.email', res.data.user.email);
      $window.sessionStorage.setItem('wefeast.user.preferences', JSON.stringify(res.data.user.preferences))
      $window.sessionStorage.setItem('wefeast.user.dietrestrictions', JSON.stringify(res.data.user.restrictions))
      $state.go('dashboard.profile');
    })

  }
  return {
    processData: processData,
    sendEditProfile: sendEditProfile
  };

}])

.factory('Auth', ['$http', '$state', '$window','eventFactory',function ($http, $state, $window, eventFactory) {

  var userData = {};
  var signin = function (userdata) {
    return $http({
      method: 'POST',
      url: '/api/users/signin',
      data: userdata
    })
    .then(function (res) {
      $window.localStorage.setItem('com.app', res.data.token);
      $window.sessionStorage.setItem('wefeast.user.username', res.data.user.username);
      $window.sessionStorage.setItem('wefeast.user.first', res.data.user.firstname);
      $window.sessionStorage.setItem('wefeast.user.last', res.data.user.lastname);
      $window.sessionStorage.setItem('wefeast.user.location', res.data.user.location);
      $window.sessionStorage.setItem('wefeast.user.email', res.data.user.email);
      $window.sessionStorage.setItem('wefeast.user.preferences', JSON.stringify(res.data.user.preferences))
      $window.sessionStorage.setItem('wefeast.user.dietrestrictions', JSON.stringify(res.data.user.dietRestrictions))
      $window.sessionStorage.setItem('wefeast.userList', JSON.stringify(res.data.allUsers))
      return res;
    })
    .catch(function (error) {
      console.error(error);
    });
  };

  var signup = function (userdata) {
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: userdata
    })
    .then(function (res) {
      $window.localStorage.setItem('com.app', res.data.token);
      $window.sessionStorage.setItem('wefeast.user.username', res.data.user.username);
      $window.sessionStorage.setItem('wefeast.user.first', res.data.user.firstname);
      $window.sessionStorage.setItem('wefeast.user.last', res.data.user.lastname);
      $window.sessionStorage.setItem('wefeast.user.location', res.data.user.location);
      $window.sessionStorage.setItem('wefeast.user.email', res.data.user.email);
      $window.sessionStorage.setItem('wefeast.user.preferences', JSON.stringify(res.data.user.preferences))
      $window.sessionStorage.setItem('wefeast.user.dietrestrictions', JSON.stringify(res.data.user.dietRestrictions))
      $window.sessionStorage.setItem('wefeast.userList', JSON.stringify(res.data.allUsers));
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
    $window.sessionStorage.removeItem('wefeast.user.username');
    $window.sessionStorage.removeItem('wefeast.user.first');
    $window.sessionStorage.removeItem('wefeast.user.last');
    $window.sessionStorage.removeItem('wefeast.user.location');
    $window.sessionStorage.removeItem('wefeast.user.email');
    $window.sessionStorage.removeItem('userList');
    $window.sessionStorage.removeItem('wefeast.userList');
    $window.sessionStorage.removeItem('wefeast.user.dietrestrictions');
    $window.sessionStorage.removeItem('wefeast.user.preferences');
    $window.sessionStorage.removeItem('wefeast.user.events');
  };

  return {
    signin: signin,
    signup: signup,
    isAuth: isAuth,
    signout: signout,
    userData:userData
  };
}]);
