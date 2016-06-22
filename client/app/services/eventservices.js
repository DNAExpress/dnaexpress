'use strict';
angular.module('app.eventfactory',[])

.factory('eventFactory', ['$http','$state', '$window', function ($http, $state, $window) {

    var guestList = [];

    var eventData = {};

    var createEvent = function(data) {
        $state.go('loading');
        return $http({
          method:'POST',
          url: 'api/events/create',
          data: data
        })
        .then(function(res){
          return res;
        })
        .catch(function(error) {
        })
      };

    return {
      guestList: guestList,
      createEvent: createEvent,
      eventData: eventData
    };

}])
