angular.module('app.showevent', ['app.eventfactory'])

.controller('ShowEventCtrl', ['$scope', '$window', '$stateParams', 'eventFactory', function($scope, $window, $stateParams, eventFactory) {
  eventFactory.fetchEvents();
  $scope.eventBinLeft = [];
  $scope.eventBinCenter = [];
  $scope.eventBinRight = [];
  $scope.singleEvent = $stateParams.singleevent;
  $scope.recommendationsBinLeft = [];
  $scope.recommendationsBinCenter = [];
  $scope.recommendationsBinRight = [];
  $scope.recommendations = JSON.parse($window.sessionStorage.getItem('wefeast.temp.recommendations'));
  $scope.noEventsNotice = "No Events To Display";
  $scope.allEventList = JSON.parse($window.sessionStorage.getItem('wefeast.user.events'));

  $scope.userIsEventCreator = function(event) {
    console.log(event);
    if (event.creator === $window.sessionStorage.getItem('wefeast.user.username')) {
      return true
    }
    else {
      return false
    }
  };

  $scope.setRecommendations = function(list) {
    $window.sessionStorage.removeItem('wefeast.temp.recommendations');
    $window.sessionStorage.setItem('wefeast.temp.recommendations', JSON.stringify(list));
  }

  $scope.selectRecommendation = function(selection) {
    $window.sessionStorage.removeItem('wefeast.selection');
    $window.sessionStorage.setItem('wefeast.selection', JSON.stringify(selection));
  };

  $scope.selection = JSON.parse($window.sessionStorage.getItem('wefeast.selection'));

  var flag = "L";
  if ($scope.allEventList && $scope.allEventList.length > 0) {

    for (var i = 0; i < $scope.allEventList.length; i++) {
      if (flag === "L") {
        $scope.eventBinLeft.push($scope.allEventList[i]);
        flag = "C"
      }
      else if (flag === "C") {
        $scope.eventBinCenter.push($scope.allEventList[i]);
        flag = "R";
      }
      else {
        $scope.eventBinRight.push($scope.allEventList[i]);
        flag = "L"
      }
    }
  }
  else {
    $scope.allEventList = null;
  }

  var recFlag = "L";
  if ($scope.recommendations && $scope.recommendations.length > 0) {

    for (var j = 0; j < $scope.recommendations.length; j++) {
      if (recFlag === "L") {
        $scope.recommendationsBinLeft.push($scope.recommendations[j]);
        recFlag = "C";
      }
      else if (recFlag === "C" ) {
        $scope.recommendationsBinCenter.push($scope.recommendations[j]);
        recFlag = "R";
      }
      else {
        $scope.recommendationsBinRight.push($scope.recommendations[j]);
        recFlag = "L";
      }
    }
  }





}]);
