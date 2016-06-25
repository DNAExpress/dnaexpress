'use strict';
angular.module('app.friendservices', [])

.factory('FriendFactory', ['$http', '$state', function($http, $state) {

  var searchResponseData = ["Abraham Lincoln"];

  var search = function(searchTerm) {

    return $http({
      method:'POST',
      url: '/api/search', //api for people search?
      data: userdata
    })
      .then(function(res){
        console.log("inside friendservices");
        return res;
      })
      .catch(function(err) {
        console.log("Error inside friendservices search", err)
      })
    };

  return {
    searchResponseData:searchResponseData,
    search:search
  }




}])
