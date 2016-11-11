// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.feed', {
      url: '/feed',
      views: {
        'tab-feed': {
          templateUrl: 'templates/tab-feed.html',
          controller: 'FeedCtrl'
        }
      }
    })
    .state('tab.feed-history', {
      url: '/feed/history',
      views: {
        'tab-feed': {
          templateUrl: 'templates/feed-history.html',
          controller: 'FeedCtrl'
        }
      }
    })

  .state('tab.change', {
      url: '/change',
      views: {
        'tab-change': {
          templateUrl: 'templates/tab-change.html',
          controller: 'ChangeCtrl'
        }
      }
    })
    .state('tab.change-history', {
      url: '/change/history',
      views: {
        'tab-change': {
          templateUrl: 'templates/change-history.html',
          controller: 'ChangeCtrl'
        }
      }
    })

  .state('tab.sleep', {
      url: '/sleep',
      views: {
        'tab-sleep': {
          templateUrl: 'templates/tab-sleep.html',
          controller: 'SleepCtrl'
        }
      }
    })
    .state('tab.sleep-history', {
      url: '/sleep/history',
      views: {
        'tab-sleep': {
          templateUrl: 'templates/sleep-history.html',
          controller: 'ChangeCtrl'
        }
      }
    })

  .state('tab.growth', {
      url: '/growth',
      views: {
        'tab-growth': {
          templateUrl: 'templates/tab-growth.html',
          controller: 'GrowthCtrl'
        }
      }
    })
    .state('tab.growth-history', {
      url: '/growth/history',
      views: {
        'tab-growth': {
          templateUrl: 'templates/growth-history.html',
          controller: 'GrowthCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});
