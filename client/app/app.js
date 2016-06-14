'use strict'
var app = angular.module('app', [
  'ui.router',
  'app.services',
<<<<<<< HEAD
<<<<<<< 177590ab48f82f7a535cd277733940f612c1185c
  'app.main',
=======
  'app.editprofile',
  'app.createprofile',
  // 'app.welcome',
>>>>>>> [feat]added edit profile state view and controller
=======
  'app.editprofile',
  'app.createprofile',
  // 'app.welcome',
>>>>>>> feb52c9eb2175f367de5dc58013c34490c2a71e0
  'app.auth',
  'app.dashboard',
  'app.optionform',
  'app.createevent',
  'app.showevent',
  'app.restaurantresults'

  ]);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('main', {
      url: '/',
      abstract:true,
      templateUrl:'app/views/welcome.html',
      controller: 'MainCtrl'
    })
    .state('main.buttons', {
      url: '',
      templateUrl:'app/views/welcomebuttons.html'
    })
    .state('main.signup', {
      templateUrl:'app/views/signup.html',
      controller: 'AuthCtrl'
    })
    .state('main.signin', {
      templateUrl:'app/views/signin.html',
      controller: 'AuthCtrl'
    })
    .state('dashboard', {
      url:'/dashboard',
      templateUrl:'app/views/dashboard.html',
      controller:'DashboardCtrl',
      authenticate: true
    })
    .state('dashboard.createevent', {
      url:'/createevent',
      templateUrl:'app/views/eventform.html',
      controller:'CreateEventCtrl'
    })
    .state('dashboard.showevent', {
      url:'/events',
      templateUrl:'app/views/showevent.html',
      controller:'ShowEventCtrl',
      authenticate: true
    })
    .state('dashboard.optionform', {
      url:'/optionform',
      templateUrl:'app/views/optionform.html',
      controller:'OptionformCtrl',
      authenticate: true
    })
    .state('dashboard.restaurantResults', {
      url:'/recommendation',
      templateUrl:'app/views/restaurantResults.html',
      controller:'RestaurantResultsCtrl',
      authenticate: true
    })
    .state('dashboard.loading', {
      url:'/loading',
      templateUrl:'app/views/loading.html',
<<<<<<< HEAD
      authenticate: true
    })
    .state('dashboard.profile', {
      url:'/profile',
      templateUrl:'app/views/profile.html',
      authenticate: true
=======
      controller:'OptionformCtrl'
    })
    .state('dashboard.profile', {
      url:'/profile',
      templateUrl:'app/views/profile.html'
>>>>>>> feb52c9eb2175f367de5dc58013c34490c2a71e0
    })
    .state('main.createprofile', {
      url:'/createprofile',
      templateUrl:'app/views/createprofile.html',
      controller:'CreateProfileCtrl',
      params:{
        user:null
      }
    })
    .state('dashboard.editprofile', {
      url:'/editprofile',
      templateUrl:'app/views/editprofile.html',
<<<<<<< HEAD
<<<<<<< 177590ab48f82f7a535cd277733940f612c1185c
      controller:'OptionformCtrl',
      authenticate: true
=======
      controller:'EditProfileCtrl'
>>>>>>> [feat]added edit profile state view and controller
=======
      controller:'EditProfileCtrl'
>>>>>>> feb52c9eb2175f367de5dc58013c34490c2a71e0
    });

    $locationProvider.html5Mode(true);

    $httpProvider.interceptors.push('AttachTokens');
})

.factory('AttachTokens', function ($window) {
  var attach = {
    request: function (object) {
      var jwt = $window.localStorage.getItem('com.app');
      if (jwt) {
        object.headers['x-access-token'] = jwt;
      }
      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    }
  };
  return attach;
})
.run(function ($rootScope, $state, Auth) {
  $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
    if (toState.authenticate && !Auth.isAuth()) {
      $state.go('main.buttons');
      event.preventDefault();
    }
  });
});
