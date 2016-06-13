'use strict'
var app = angular.module('app', [
  'ui.router',
  'app.services',
  'app.editprofile',
  // 'app.welcome',
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
      controller: 'DashboardCtrl'
    })
    .state('main.buttons', {
      url:'',
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
      controller:'ShowEventCtrl'
    })
    .state('dashboard.optionform', {
      url:'/optionform',
      templateUrl:'app/views/optionform.html',
      controller:'OptionformCtrl'
    })
    .state('dashboard.restaurantResults', {
      url:'/recommendation',
      templateUrl:'app/views/restaurantResults.html',
      controller:'RestaurantResultsCtrl'
    })
    .state('dashboard.loading', {
      url:'/loading',
      templateUrl:'app/views/loading.html',
      controller:'OptionformCtrl'
    })
    .state('dashboard.profile', {
      url:'/profile',
      templateUrl:'app/views/profile.html'
    })
    .state('dashboard.editprofile', {
      url:'/editprofile',
      templateUrl:'app/views/editprofile.html',
      controller:'EditProfileCtrl'
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
  $rootScope.$on('$stateChangeStart', function (evt, toState) {
    if (toState.authenticate && !Auth.isAuth()) {
      $state.go('main');
    }
  });
});

// app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

//   $urlRouterProvider.otherwise('/');

//   $stateProvider
//     // .state('home', {
//     //   url:'/',
//     //   // templateUrl:'app/home/welcome.html',
//     //   // controller: 'welcomeCtrl'
//     // })
//     .state('main', {
//       url: '/',
//       views: {
//         '@': {
//           templateUrl:'app/home/welcome.html',
//           controller: 'welcomeCtrl'
//         },
//         'body@.signin': {
//           templateUrl:'app/home/signup.html',
//           controller: 'authCtrl'
//         },
//         'body@.signup': {
//           templateUrl:'app/home/signin.html',
//           controller: 'authCtrl'
//         }
//       }

//     })
//     .state('main.signin', {})
//     .state('main.signup', {});
    // .state('home.signin', {
    //   url:'signin',
    //   templateUrl:'app/home/signin.html',
    //   controller:'authCtrl'
    // })
    // .state('home.signup', {
    //   url:'signup',
    //   templateUrl:'app/home/signup.html',
    //   controller:'authCtrl'
    // })
    // .state('home', {
    //   url:'/dashboard',
    //   parent: 'home',
    //   templateUrl:'app/home/welcome.html',
    //   controller:'welcomeCtrl'
    // })

//     $locationProvider.html5Mode(true);
// });

//   'app.welcome',
//   'app.auth',
//   'app.dashboard'
//   ]);

// app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

//   $urlRouterProvider.otherwise('/');

//   $stateProvider
//     .state('main', {
//       url: '/',
//       templateUrl:'app/home/welcome.html',
//       controller: 'welcomeCtrl'
//     })
//     .state('signup', {
//       templateUrl:'app/home/signup.html',
//       controller: 'authCtrl'
//     })
//     .state('signin', {
//       templateUrl:'app/home/signin.html',
//       controller: 'authCtrl'
//     })
//     .state('dashboard', {
//       url:'/dashboard',
//       templateUrl:'app/dashboard/dashboard.html',
//       controller:'dashboard.js'
//     })
