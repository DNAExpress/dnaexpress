'use strict'
var app = angular.module('app', [
  'ui.router',
  'app.welcome',
  'app.auth',
  'app.dashboard',
  'app.optionform',
  'app.createevent'
  ]);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('main', {
      url: '/',
      templateUrl:'app/home/welcome.html',
      // controller: 'WelcomeCtrl'
    })
    .state('main.signup', {
      templateUrl:'app/home/signup.html',
      controller: 'AuthCtrl'
    })
    .state('main.signin', {
      templateUrl:'app/home/signin.html',
      controller: 'AuthCtrl'
    })
    .state('dashboard', {
      url:'/dashboard',
      templateUrl:'app/dashboard/dashboard.html',
      controller:'DashboardCtrl'
    })
    .state('dashboard.createevent', {
      url:'/createevent',
      templateUrl:'app/dashboard/createevent.html',
      controller:'CreateEventCtrl'
    })
    .state('dashboard.showevent', {
      url:'/events',
      templateUrl:'app/dashboard/showevent.html',
      controller:'ShoweventCtrl'
    })
    .state('dashboard.optionform', {
      url:'/optionform',
      templateUrl:'app/dashboard/optionform.html',
      controller:'OptionformCtrl'
    })

  $locationProvider.html5Mode(true);
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
