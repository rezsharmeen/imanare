angular.module('starter.userService', [])
        .service('userService', function () {

            var userId, userName, userEmail;

            this.getUserID = function () {
                return userId;
            };

            this.setUserID = function (value) {
                userId = value;
            };

            this.getUserName = function () {
                return userName;
            };

            this.setUserName = function (value, type) {
                if (type == 'email')
                    userName = this.firstPartOfEmail(value);
                else
                    userName = value;
            };

            this.getUserEmail = function () {
                return userEmail;
            };

            this.setUserEmail = function (value) {
                userEmail = value;
            };

            this.firstPartOfEmail = function (email) {
                return this.ucfirst(email.substr(0, email.indexOf('@')) || '');
            };

            this.ucfirst = function (str) {
                // inspired by: http://kevin.vanzonneveld.net
                str += '';
                var f = str.charAt(0).toUpperCase();
                return f + str.substr(1);
            };


        });


