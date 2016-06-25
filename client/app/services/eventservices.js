'use strict';
angular.module('app.eventfactory',[])

.factory('eventFactory', ['$http','$state', '$window', function ($http, $state, $window) {

    var guestList = [];

    var eventData = {};

    var databinLeft = [];

    var databinRight = [];

    var distributeGuestList = function(data) {
      var flag = "L";
      for(var user in data) {
        if (flag === "L") {
          databinLeft.push(data[user]);
          flag = "R";
        }
        else {
          databinRight.push(data[user]);
          flag = "L";
        }
      }
    };

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
      eventData: eventData,
      distributeGuestList: distributeGuestList,
      databinLeft: databinLeft,
      databinRight: databinRight
    };

}])
