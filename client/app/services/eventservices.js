'use strict';
angular.module('app.eventfactory',[])

.factory('eventFactory', ['$http','$state', '$window', function ($http, $state, $window) {

    var guestList = [];

    var eventData = {};

    var databinLeft = [];

    var databinRight = [];

    var eventBinLeft = [];

    var eventBinCenter = [];

    var eventBinRight = [];


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
          liveEventDataHandler(res);
          return res;
        }).then(function() {
          $state.go('dashboard.showevent');
        })
        .catch(function(error) {
          console.error("Error received in createEvent", error);
        })
      };

    var liveEventDataHandler = function(data) {
      $window.sessionStorage.removeItem('wefeast.user.events');
      $window.sessionStorage.setItem('wefeast.user.events', JSON.stringify(data.data));
    };

    var sendEventResponse = function(data) {
      $state.go('loading');
      return $http({
        method:'POST',
        url: 'api/events/formsubmission',
        data: data
      })
      .then(function(res) {
        liveEventDataHandler(res);
        return res;
      })
      .then(function(){
        $state.go('dashboard.showevent');
      })
      .catch(function(error) {
        console.error("Error received in sendEventResponse", error);
      })
    };

    var fetchEvents = function() {
      return $http({
        method:'POST',
        url:'api/events/getevents',
        data: {username: $window.sessionStorage.getItem('wefeast.user.username')}
      })
      .then(function(res){
        liveEventDataHandler(res);
      })
      .catch(function(error) {
        console.log(error)
      });
    };

    var declineInvite = function(data) {
      return $http({
        method:'POST',
        url:'api/events/decline',
        data:data
      })
      .then(function(res) {
        liveEventDataHandler(res);
        $state.go('dashboard.showevent');
      })
      .catch(function(error) {
        console.log(error);
      })
    }

    return {
      guestList: guestList,
      createEvent: createEvent,
      eventData: eventData,
      distributeGuestList: distributeGuestList,
      databinLeft: databinLeft,
      databinRight: databinRight,
      liveEventDataHandler: liveEventDataHandler,
      sendEventResponse: sendEventResponse,
      fetchEvents: fetchEvents,
      declineInvite: declineInvite
    };

}])
