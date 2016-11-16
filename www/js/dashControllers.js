angular.module('starter.dashController', [])
        .controller(
                'DashCtrl',
                ['$scope', '$firebaseArray', '$firebaseAuth', '$state', 'signinService', 'userService',
                    function ($scope, $firebaseArray, $firebaseAuth, $state, signinService, userService)
                    {
                        var user = {
                            email: 'test4@gmail.com',
                            name: '',
                            pass: '123456',
                            confirm: '',
                            logged: false
                        };

//
//                        function logout() {
//                            $scope.authObj.$signOut();
//                            $scope.user.logged = false;
//                        }

                        function login() {
                            debugger;
                            $scope.authObj.$signInWithEmailAndPassword($scope.user.email, $scope.user.pass).then(function (firebaseUser) {
                                console.log(firebaseUser);

                                $scope.user.logged = true;

                                var name = firebaseUser.displayName || firstPartOfEmail(firebaseUser.email);

                                userService.setUserID(firebaseUser.uid);
                                userService.setUserName(name);
                                userService.setUserEmail(firebaseUser.email);

                                console.log("Signed in as:", firebaseUser.uid);

                            }).catch(function (error) {
                                console.error("Authentication failed:", error);
                            });
                        }

                        function createAccount() {
                            $scope.err = null;
                            if (assertValidAccountProps()) {
                                var email = $scope.user.email;
                                var pass = $scope.user.pass;
                                var name = firstPartOfEmail(email);

                                // create user credentials in Firebase auth system
                                $scope.authObj.$createUserWithEmailAndPassword(email, pass)
                                        .then(function (firebaseUser) {
                                            $scope.user.name = name;
                                            userService.setUserID(firebaseUser.uid);
                                            userService.setUserName(name);
                                            userService.setUserEmail(email);
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
                        function firstPartOfEmail(email) {
                            return ucfirst(email.substr(0, email.indexOf('@')) || '');
                        }

                        function ucfirst(str) {
                            // inspired by: http://kevin.vanzonneveld.net
                            str += '';
                            var f = str.charAt(0).toUpperCase();
                            return f + str.substr(1);
                        }


                        //scopify
                        $scope.authObj = $firebaseAuth();
                        $scope.user = user;
                        $scope.createAccount = createAccount;
                        $scope.login = login;
                        //$scope.logout = logout;
                        $scope.loginGoogle = signinService.loginGoogle;
                       
                        if (signinService.signinUser()) {
                            $scope.user.logged = true;
                        } else {
                            $scope.user.logged = false;
                        }
                        console.log($scope);
                    }]);