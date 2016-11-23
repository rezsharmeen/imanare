angular.module('starter.dashController', [])
        .controller(
                'DashCtrl',
                ['$scope', '$firebaseArray', '$firebaseAuth', '$state', 'signinService', 'userService', 'currentAuth',
                    function ($scope, $firebaseArray, $firebaseAuth, $state, signinService, userService, currentAuth)
                    {
                        var user = {
                            email: 'test4@gmail.com',
                            name: '',
                            pass: '123456',
                            confirm: '',
                            logged: false
                        };


                        function login() {

                            $scope.authObj.$signInWithEmailAndPassword($scope.user.email, $scope.user.pass).then(function (firebaseUser) {
                                console.log(firebaseUser);

                                $scope.user.logged = true;


                                if (firebaseUser.displayName) {
                                    var name = firebaseUser.displayName;
                                    userService.setUserName(name, 'name');

                                } else {
                                    userService.setUserName(firebaseUser.email, 'email');
                                }
                                userService.setUserID(firebaseUser.uid);
                                userService.setUserEmail(firebaseUser.email);

                                console.log('Signed in as:', firebaseUser.uid);

                            }).catch(function (error) {
                                console.error('Authentication failed:', error);
                            });
                        }

                        function createAccount() {
                            $scope.err = null;
                            if (assertValidAccountProps()) {
                                var email = $scope.user.email;
                                var pass = $scope.user.pass;

                                // create user credentials in Firebase auth system
                                $scope.authObj.$createUserWithEmailAndPassword(email, pass)
                                        .then(function (firebaseUser) {
                                            userService.setUserID(firebaseUser.uid);
                                            userService.setUserEmail(email);
                                            userService.setUserName(name,'email');
                                            $scope.user.name = userService.getUserName();
                                           
                                        }).then(function () {
                                    // redirect to the home page
                                    $state.go('home');
                                }, function (err) {
                                    $scope.err = errMessage(err);
                                });

                            }
                        }

                        function assertValidAccountProps() {
                            if (!$scope.user.email) {
                                $scope.err = 'Please enter an email address';
                            } else if (!$scope.user.pass || !$scope.user.confirm) {
                                $scope.err = 'Please enter a password';
                            } else if ($scope.createMode && $scope.user.pass !== $scope.user.confirm) {
                                $scope.err = 'Passwords do not match';
                            }
                            return !$scope.err;
                        }

                        function errMessage(err) {
                            return angular.isObject(err) && err.code ? err.code : err + '';
                        }
//                        function firstPartOfEmail(email) {
//                            return ucfirst(email.substr(0, email.indexOf('@')) || '');
//                        }
//
//                        function ucfirst(str) {
//                            // inspired by: http://kevin.vanzonneveld.net
//                            str += '';
//                            var f = str.charAt(0).toUpperCase();
//                            return f + str.substr(1);
//                        }


                        //scopify
                        $scope.authObj = $firebaseAuth();
                        $scope.user = user;
                        $scope.createAccount = createAccount;
                        $scope.login = login;
                        //$scope.logout = logout;
                        $scope.loginGoogle = signinService.loginGoogle;

                        if (currentAuth.uid || signinService.signinUser()) {
                            $scope.user.logged = true;
                        } else {
                            $scope.user.logged = false;
                        }
                        console.log($scope);
                    }]);