var app = angular.module('app', [
  'ui.router',
  'app.welcome'
  ]);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url:'/',
      templateUrl:'app/home/welcome.html',
      controller: 'welcomeCtrl'
    })
    .state('home.welcome', {
      url:'/',
      templateUrl:'',
      controller:''
    })
    .state('home.welcome.signin', {
      url:'/',
      templateUrl:'./home/signin.html',
      controller:''
    })
    .state('home.welcome.signup', {
      url:'/',
      templateUrl:'./home/signup.html',
      controller:''
    })

    $locationProvider.html5Mode(true);
});
