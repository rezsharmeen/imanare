angular.module('starter.accountController', [])
        .controller(
                'AccountCtrl',
                ['$scope', '$firebaseArray', '$firebaseAuth', 'signinService', 'userService', '$state',
                    function ($scope, $firebaseArray, $firebaseAuth, signinService, userService, $state)
                    {
                        console.log('AccountCtrl');
                        var uuid = userService.getUserID();
                        console.log(uuid);
                        var ref = firebase.database().ref('babyProfile').child(uuid);
                        
                        var user = {
                            email: 'test4@gmail.com',
                            name: '',
                            pass: '123456',
                            confirm: '',
                            logged: false
                        };


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
                        if (signinService.signinUser()) {
                            $scope.user.logged = true;
                        } else {
                            $scope.user.logged = false;
                        }
                        console.log($scope);
                    }]);