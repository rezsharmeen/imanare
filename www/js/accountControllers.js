angular.module('starter.accountController', [])
        .controller(
                'AccountCtrl',
                ['$scope', '$firebaseArray', '$firebaseAuth', 'signinService', 'userService', '$state', 'currentAuth',
                    function ($scope, $firebaseArray, $firebaseAuth, signinService, userService, $state, currentAuth)
                    {
                        console.log('AccountCtrl');
                        var uuid;
                        var user = {
                            email: '',
                            name: '',
                            pass: '',
                            confirm: '',
                            logged: false
                        };
                        //mnp
                        if (userService.getUserID()){
                            uuid = userService.getUserID();
                            user.name = userService.getUserName();
                            user.email = userService.getUserEmail();
                        }
                        else {
                            uuid = currentAuth.uid;
                            userService.setUserID(currentAuth.uid);
                            userService.setUserEmail(currentAuth.email);
                            if (currentAuth.displayName) {
                                userService.setUserName(currentAuth.displayName, 'name');

                            } else {
                                userService.setUserName(currentAuth.email, 'email');
                            }
                            user.name = userService.getUserName();
                            user.email = userService.getUserEmail();
                        }
                        
                        console.log(currentAuth);
                        var ref = firebase.database().ref('babyProfile').child(uuid);
                        
                        function logout() {
                            $scope.authObj.$signOut().then(function () {
                                console.log('Signed Out');
                                $scope.user.logged = false;
                                $state.go('home', {reload: true});
                            }, function (error) {
                                console.error('Sign Out Error', error);
                            });
                        }

                        //scopify
                        $scope.authObj = $firebaseAuth();
                        $scope.user = user;
                        
                        
                        $scope.logout = logout;
                        
                        console.log(signinService.signinUser());
                        if (currentAuth.uid || signinService.signinUser()) {
                            $scope.user.logged = true;
                        } else {
                            $scope.user.logged = false;
                        }
                        console.log($scope);
                    }]);