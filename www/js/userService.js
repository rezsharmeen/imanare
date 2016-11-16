angular.module('starter.userService', [])
        .service('userService', function () {

            var userId, userName, userEmail ;

            this.getUserID = function () {
                return userId;
            };

            this.setUserID = function (value) {
                userId = value;
            };
            
            this.getUserName = function () {
                return userName;
            };

            this.setUserName = function (value) {
                userName = value;
            };
            
            this.getUserEmail = function () {
                return userEmail;
            };

            this.setUserEmail = function (value) {
                userEmail = value;
            };            


        });


