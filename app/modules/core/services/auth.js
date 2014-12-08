'use strict';

/**
 * @ngdoc service
 * @name core.Services.Auth
 * @description Auth Factory
 */
angular.module('core').factory('AuthFactory',['$state', '$http', '$sessionStorage', '$cordovaOauth', 
    function($state, $http, $sessionStorage, $cordovaOauth) {

            var authFactory = {};

            /**
             * @ngdoc function
             * @name core.Services.Auth#googleLogin
             * @methodOf core.Services.Auth
             */
            authFactory.googleLogin = function() {
                $cordovaOauth.google("229108461520-kto8p350n74qgla7erokj8ufui13b9to.apps.googleusercontent.com", 
                    ['email', 'profile', 'https://www.googleapis.com/auth/plus.login']).then(function(result) {
                    console.log(result);
                    authFactory.setToken(result);
                    $http.get('https://www.googleapis.com/plus/v1/people/me', {
                        headers: {  
                                    'Content-Type': 'application/json',
                                    'Authorization': 'Bearer ' + authFactory.getToken().access_token
                                }
                        }).success(function(data) {
                            console.log(data);
                        });
                    $state.go('start');
                }, function(error) {
                    console.log("error " + error);
                });
            };

            authFactory.googleLogout = function() {
                $http.get('https://accounts.google.com/o/oauth2/revoke?token=' + authFactory.getToken().access_token)
                    .success(function() {
                        console.log("Successfully logged out from Google.");
                    }).error(function(error) {
                        console.log("Failed to logout from google: " + error);
                    });
            };

            /**
             * @ngdoc function
             * @name core.Services.Auth#setToken
             * @methodOf core.Services.Auth
             */
            authFactory.setToken = function(token) {
                $sessionStorage.token = token;
            };

            /**
             * @ngdoc function
             * @name core.Services.Auth#getToken
             * @methodOf core.Services.Auth
             * @return {string} the token
             */
            authFactory.getToken = function() {
                return $sessionStorage.token;
            };

            /**
            * @ngdoc function
            * @name core.Services.Auth#hasToken
            * @methodOf core.Services.Auth
            * @return {boolean} Returns true if has a token
            */
            authFactory.hasToken = function() {
                return $sessionStorage.token != null;
            };

            /**
            * @ngdoc function
            * @name core.Services.Auth#logout
            * @methodOf core.Services.Auth
            */
            authFactory.logout = function() {
                authFactory.googleLogout();
                delete $sessionStorage.token;
                $state.go('home');
            };

            return authFactory;
    }]);
