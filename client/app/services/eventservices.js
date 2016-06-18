'use strict';
angular.module('app.eventfactory',[])

.factory('eventFactory', ['$http','$state', '$window', function ($http, $state, $window) {

    var guestList = [];

    var createEvent = function(data) {
        console.log("inside create event factory",data);
        return $http({
          method:'POST',
          url: '/api/events/create',
          data: data
        })
        .then(function(res){
          console.log("inside eventFactory, response received ");
          return res;
        })
        .catch(function(error) {
          console.log("Error received", error);
        })
      };

    return {
      guestList: guestList,
      createEvent: createEvent
    };

}])
