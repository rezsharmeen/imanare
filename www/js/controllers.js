angular.module('starter.controllers', [])

//.controller('DashCtrl', function($scope) {})

//.controller('FeedCtrl', function($scope) {})

.controller('ChangeCtrl', function($scope) {})

.controller('SleepCtrl', function($scope) {})

.controller('GrowthCtrl', function($scope) {})

.controller('BabiesCtrl', function($scope) {
//    $scope.babies = [
//        {name : "Abcd E Fghijk", dob: "2016-01-01", note: "Ah, the Button, an essential part of any mobile experience. Like the Header, they come in the full spectrum of Ionic's default colors."},
//        {name : "Lmno E Pqedrt", dob: "2016-02-01", note: ""},
//        {name : "Vwxy E Adseds", dob: "2016-03-01", note: "Ah, the Form, an essential part of any mobile experience. Like the Header, they come in the full spectrum of Ionic's default colors."},
//    ];
//    
//    $scope.currentBaby = $scope.babies[0];
})

.directive("ng-datetime", ["$filter", function($filter) {
  var linkFn = function (scope, element, attr, ctrl) {
    var listener = function() {
      var value = element.val();
      if (ctrl.$viewValue !== value) {
        scope.$apply(function() {
          ctrl.$setViewValue(value);
        });
      }
    };
    element.bind('change', listener);
  };
  return {
    restrict: 'A',
    require: 'ngModel',
    link: linkFn
  };
}]);

//.controller('AccountCtrl', function($scope) {});
