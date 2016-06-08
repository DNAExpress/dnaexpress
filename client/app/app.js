var dna_app = angular.module('dna_app', ['ui-router']);

dna_app.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/home');

  $stateProvider
    .state('home', {
      url:'/index.html',
      templateUrl:''
    })
    .state('home.welcome', {
      url:'/welcome.html',
      templateUrl:'./auth/welcome.html',
      controller:''
    })
    .state('home.welcome.signin', {
      url:'/signin.html',
      templateUrl:'./auth/signin.html',
      controller:''
    })
    .state('home.welcome.signup', {
      url:'/signup.html',
      templateUrl:'./auth/signup.html',
      controller:''
    })

})
