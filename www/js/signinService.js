angular.module('starter.signinService', ['starter.userService'])


        .factory('signinService', function ($firebaseAuth, userService, $state) {
            var authObj = $firebaseAuth();


            return {
                firstPartOfEmail: function (email) {
                    return this.ucfirst(email.substr(0, email.indexOf('@')) || '');
                },
                ucfirst: function (str) {
                    // inspired by: http://kevin.vanzonneveld.net
                    str += '';
                    var f = str.charAt(0).toUpperCase();
                    return f + str.substr(1);
                },
                signinUser: function () {
                    
                    var firebaseUser = authObj.$getAuth();
                    if (firebaseUser) {
                        var name = firebaseUser.displayName || this.firstPartOfEmail(firebaseUser.email);
                        console.log(firebaseUser);
                        userService.setUserID(firebaseUser.uid);
                        userService.setUserName(name);
                        userService.setUserEmail(firebaseUser.email);
                        return firebaseUser.uid;
                    } else {
                        return false;
                    }
                },
                loginFacebook: function () {
                    var provider = new firebase.auth.FacebookAuthProvider();
                    firebase.auth().signInWithPopup(provider).then(function (result) {
                        var token = result.credential.accessToken;
                        var user = result.user;
                        userService.setUserID(user.uid);
                        userService.setUserName(user.displayName);
                        userService.setUserEmail(user.email);

                    }).catch(function (error) {
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        var email = error.email;
                        var credential = error.credential;

                    });
                },
                loginGoogle: function () {
                    
                    var provider = new firebase.auth.GoogleAuthProvider();
                    provider.addScope('https://www.googleapis.com/auth/plus.login');
                    firebase.auth().signInWithPopup(provider).then(function (result) {

                        var token = result.credential.accessToken;
                        var user = result.user;
                        userService.setUserID(user.uid);
                        userService.setUserName(user.displayName);
                        userService.setUserEmail(user.email);
                        console.log(result.user);
                        $state.go('tab.dash', {reload: true});
                    }).catch(function (error) {
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        var email = error.email;
                        var credential = error.credential;

                    });

                }

            };
        });


