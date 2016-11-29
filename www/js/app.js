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
        .factory("Auth", ["$firebaseAuth",
            function($firebaseAuth) {
                return $firebaseAuth();
            }
        ])
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

//            $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
//                var user = firebase.auth().currentUser;
//                
//                if (user === null && toState.name !== 'home' ) {
//                  event.preventDefault();
//                  $state.transitionTo("home");
//                  return;
//                }
//                
//                if (user !== null && toState.name === 'home' ) {
//                  event.preventDefault();
//                  $state.transitionTo("tab.dash");
//                  return;
//                }
//                
//                return;
//            });
            $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
                // We can catch the error thrown when the $requireAuth promise is rejected
                // and redirect the user back to the home page
                if (error === 'AUTH_REQUIRED' && toState.name !== 'home') {
                    $state.transitionTo('home');
                } else if(error !== 'AUTH_REQUIRED' && toState.name === 'home' ) {
                    event.preventDefault();
                    $state.transitionTo('tab.dash');
                    return;
                }
            });
             $rootScope.$on("$stateChange", function(event, toState, toParams, fromState, fromParams, error) {
                var user = firebase.auth().currentUser;
                console.log(user);
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
                        controller: 'HomeCtrl',
                        resolve: {'currentAuth': ['Auth', function(Auth) {return Auth.$getAuth();}]}
                    })
                    
                    // setup an abstract state for the tabs directive
                    .state('tab', {
                        cache: false,
                        url: '/tab',
                        abstract: true,
                        templateUrl: 'templates/tabs.html',
                        resolve: {'currentAuth': ['Auth', function(Auth) {return Auth.$requireSignIn();}]}
                    })

                    // Each tab has its own nav history stack:

                    .state('tab.dash', {
                        cache: false,
                        url: '/dash',
                        views: {
                            'tab-dash': {
                                templateUrl: 'templates/tab-dash.html',
                                controller: 'DashCtrl',
                            }
                        },
                        resolve: {'currentAuth': ['Auth', function(Auth) {return Auth.$requireSignIn();}]}
                    })

                    .state('tab.feed', {
                        cache: false,
                        url: '/feed',
                        views: {
                            'tab-feed': {
                                templateUrl: 'templates/tab-feed.html',
                                controller: 'FeedCtrl'
                            }
                        },
                        resolve: {'currentAuth': ['Auth', function(Auth) {console.log(Auth.$requireSignIn());return Auth.$requireSignIn();}]}
                    })
                    .state('tab.feed-history', {
                        cache: false,
                        url: '/feed/history',
                        views: {
                            'tab-feed': {
                                templateUrl: 'templates/feed-history.html',
                                controller: 'FeedCtrl'
                            }
                        },
                        resolve: {'currentAuth': ['Auth', function(Auth) {return Auth.$requireSignIn();}]}
                    })

                    .state('tab.change', {
                        cache: false,
                        url: '/change',
                        views: {
                            'tab-change': {
                                templateUrl: 'templates/tab-change.html',
                                controller: 'ChangeCtrl'
                            }
                        },
                        resolve: {'currentAuth': ['Auth', function(Auth) {return Auth.$requireSignIn();}]}
                    })
                    .state('tab.change-history', {
                        cache: false,
                        url: '/change/history',
                        views: {
                            'tab-change': {
                                templateUrl: 'templates/change-history.html',
                                controller: 'ChangeCtrl'
                            }
                        },
                        resolve: {'currentAuth': ['Auth', function(Auth) {return Auth.$requireSignIn();}]}
                    })

                    .state('tab.sleep', {
                        cache: false,
                        url: '/sleep',
                        views: {
                            'tab-sleep': {
                                templateUrl: 'templates/tab-sleep.html',
                                controller: 'SleepCtrl'
                            }
                        },
                        resolve: {"currentAuth": ['Auth', function(Auth) {return Auth.$requireSignIn();}]}
                    })
                    .state('tab.sleep-history', {
                        cache: false,
                        url: '/sleep/history',
                        views: {
                            'tab-sleep': {
                                templateUrl: 'templates/sleep-history.html',
                                controller: 'ChangeCtrl'
                            }
                        },
                        resolve: {'currentAuth': ['Auth', function(Auth) {return Auth.$requireSignIn();}]}
                    })

                    .state('tab.growth', {
                        cache: false,
                        url: '/growth',
                        views: {
                            'tab-growth': {
                                templateUrl: 'templates/tab-growth.html',
                                controller: 'GrowthCtrl'
                            }
                        },
                        resolve: {'currentAuth': ['Auth', function(Auth) {return Auth.$requireSignIn();}]}
                    })
                    .state('tab.growth-history', {
                        cache: false,
                        url: '/growth/history',
                        views: {
                            'tab-growth': {
                                templateUrl: 'templates/growth-history.html',
                                controller: 'GrowthCtrl'
                            }
                        },
                        resolve: {'currentAuth': ['Auth', function(Auth) {return Auth.$requireSignIn();}]}
                    })

                    .state('tab.account', {
                        cache: false,
                        url: '/account',
                        views: {
                            'tab-account': {
                                templateUrl: 'templates/tab-account.html',
                                controller: 'AccountCtrl'
                            }
                        },
                        resolve: {'currentAuth': ['Auth', function(Auth) {return Auth.$requireSignIn();}]}
                    })
                    .state('tab.babies', {
                        cache: false,
                        url: '/babies',
                        views: {
                            'tab-account': {
                                templateUrl: 'templates/tab-babies.html',
                                controller: 'BabiesCtrl'
                            }
                        },
                        resolve: {'currentAuth': ['Auth', function(Auth) {return Auth.$requireSignIn();}]}
                    });

            // if none of the above states are matched, use this as the fallback
            $urlRouterProvider.otherwise('/home');

        });
