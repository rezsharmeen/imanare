// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', [
    'ionic',
    'firebase',
    'ui.router',
    'angular.filter',
    'starter.controllers',
    'starter.homeController',
    'starter.feedController',
    'starter.dashController',
    'starter.accountController',
    'starter.services',
    'starter.signinService',
    'starter.userService'])

        .run(function ($ionicPlatform, firebase, $rootScope, $state) {
            $ionicPlatform.ready(function () {
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
            var config = {
                apiKey: "AIzaSyDSL3sjOssp9qp6nmxE39RefzL1GDLJwhM",
                authDomain: "babylog-d092d.firebaseapp.com",
                databaseURL: "https://babylog-d092d.firebaseio.com",
                storageBucket: "babylog-d092d.appspot.com",
                messagingSenderId: "31374624217"
            };
            firebase.initializeApp(config);

            $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
                var user = firebase.auth().currentUser;
                console.log(user);
                if (user === null && toState.name !== 'home' ) {
                  event.preventDefault();
                  $state.transitionTo("home");
                  return;
                }
                
                if (user !== null && toState.name === 'home' ) {
                  event.preventDefault();
                  $state.transitionTo("tab.dash");
                  return;
                }
                
                return;
            });
        })
        .config(function ($stateProvider, $urlRouterProvider) {

            // Ionic uses AngularUI Router which uses the concept of states
            // Learn more here: https://github.com/angular-ui/ui-router
            // Set up the various states which the app can be in.
            // Each state's controller can be found in controllers.js
            $stateProvider
                    // Pre login page
                    .state('home', {
                        cache: false,
                        url: '/home',
                        templateUrl: 'templates/home.html',
                        controller: 'HomeCtrl'
                    })
                    
                    // setup an abstract state for the tabs directive
                    .state('tab', {
                        cache: false,
                        url: '/tab',
                        abstract: true,
                        templateUrl: 'templates/tabs.html',
                    })

                    // Each tab has its own nav history stack:

                    .state('tab.dash', {
                        cache: false,
                        url: '/dash',
                        views: {
                            'tab-dash': {
                                templateUrl: 'templates/tab-dash.html',
                                controller: 'DashCtrl'
                            }
                        }
                    })

                    .state('tab.feed', {
                        cache: false,
                        url: '/feed',
                        views: {
                            'tab-feed': {
                                templateUrl: 'templates/tab-feed.html',
                                controller: 'FeedCtrl'
                            }
                        }
                    })
                    .state('tab.feed-history', {
                        cache: false,
                        url: '/feed/history',
                        views: {
                            'tab-feed': {
                                templateUrl: 'templates/feed-history.html',
                                controller: 'FeedCtrl'
                            }
                        }
                    })

                    .state('tab.change', {
                        cache: false,
                        url: '/change',
                        views: {
                            'tab-change': {
                                templateUrl: 'templates/tab-change.html',
                                controller: 'ChangeCtrl'
                            }
                        }
                    })
                    .state('tab.change-history', {
                        cache: false,
                        url: '/change/history',
                        views: {
                            'tab-change': {
                                templateUrl: 'templates/change-history.html',
                                controller: 'ChangeCtrl'
                            }
                        }
                    })

                    .state('tab.sleep', {
                        cache: false,
                        url: '/sleep',
                        views: {
                            'tab-sleep': {
                                templateUrl: 'templates/tab-sleep.html',
                                controller: 'SleepCtrl'
                            }
                        }
                    })
                    .state('tab.sleep-history', {
                        cache: false,
                        url: '/sleep/history',
                        views: {
                            'tab-sleep': {
                                templateUrl: 'templates/sleep-history.html',
                                controller: 'ChangeCtrl'
                            }
                        }
                    })

                    .state('tab.growth', {
                        cache: false,
                        url: '/growth',
                        views: {
                            'tab-growth': {
                                templateUrl: 'templates/tab-growth.html',
                                controller: 'GrowthCtrl'
                            }
                        }
                    })
                    .state('tab.growth-history', {
                        cache: false,
                        url: '/growth/history',
                        views: {
                            'tab-growth': {
                                templateUrl: 'templates/growth-history.html',
                                controller: 'GrowthCtrl'
                            }
                        }
                    })

                    .state('tab.account', {
                        cache: false,
                        url: '/account',
                        views: {
                            'tab-account': {
                                templateUrl: 'templates/tab-account.html',
                                controller: 'AccountCtrl'
                            }
                        }
                    });

            // if none of the above states are matched, use this as the fallback
            $urlRouterProvider.otherwise('/home');

        });
