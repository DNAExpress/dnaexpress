angular.module('app.showevent', ['app.eventfactory'])

.controller('ShowEventCtrl', ['$scope', '$window', '$stateParams', 'eventFactory', function($scope, $window, $stateParams, eventFactory) {
  eventFactory.fetchEvents();
  $scope.eventBinLeft = [];
  $scope.eventBinCenter = [];
  $scope.eventBinRight = [];
  $scope.singleEvent = $stateParams.singleevent;
  $scope.noEventsNotice = "No Events To Display";
  $scope.allEventList = JSON.parse($window.sessionStorage.getItem('wefeast.user.events'));

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








}]);
