angular.module('app.showevent', [])

.controller('ShowEventCtrl', ['$scope', '$window', '$stateParams', function($scope, $window, $stateParams) {
  $scope.eventBinLeft = [];
  $scope.eventBinCenter = [];
  $scope.eventBinRight = [];
  $scope.singleEvent = $stateParams.singleevent;
  $scope.noEventsNotice;

  $scope.allEventList = JSON.parse($window.sessionStorage.getItem('wefeast.user.events'));

  var flag = "L";
  if ($scope.allEventList.length > 0) {

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
    $scope.noEventsNotice = "No Events To Display";
  }








}]);
