angular.module('starter.controllers', [])

//.controller('DashCtrl', function($scope) {})

//.controller('FeedCtrl', function($scope) {})

.controller('ChangeCtrl', function($scope) {})

.controller('SleepCtrl', function($scope) {})

.controller('GrowthCtrl', function($scope) {})

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
