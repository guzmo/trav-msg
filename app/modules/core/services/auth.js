'use strict';

/**
 * @ngdoc service
 * @name core.Services.Auth
 * @description Auth Factory
 */
angular.module('core').factory('AuthFactory',
    ['$state', '$http', '$sessionStorage', '$cordovaOauth', '$cordovaSpinnerDialog', 'UserFactory', 'OauthProvider',
    function($state, $http, $sessionStorage, $cordovaOauth, $cordovaSpinnerDialog, UserFactory, OauthProvider) {

            var authFactory = {};

            /**
             * @ngdoc function
             * @name core.Services.Auth#googleLogin
             * @methodOf core.Services.Auth
             */
            authFactory.googleLogin = function() {
                $cordovaSpinnerDialog.show("Loggar in", "", true);
                OauthProvider.google("229108461520-kto8p350n74qgla7erokj8ufui13b9to.apps.googleusercontent.com", 
                    ['email', 'profile']).then(function(result) {
                    authFactory.setToken(result);
                    $http.get('https://www.googleapis.com/plus/v1/people/me', {
                        headers: {  
                                    'Content-Type': 'application/json',
                                    'Authorization': 'Bearer ' + authFactory.getToken().access_token
                                }
                        }).success(function(data) {
                            authFactory.setUsername(data.name.givenName);
                            UserFactory.createIfNotExists(data);
                            $cordovaSpinnerDialog.hide();
                            $state.go('start');
                        }).error(function() {
                            $cordovaSpinnerDialog.hide();
                            alert("Fel vid autentiseringen.");
                        });
                }, function(error) {
                    $cordovaSpinnerDialog.hide();
                    alert("Fel vid autentiseringen.");
                });
            };

            authFactory.googleLogout = function() {
                $cordovaSpinnerDialog.show("Loggar ut", "", true);
                $http.get('https://accounts.google.com/o/oauth2/revoke?token=' + authFactory.getToken().access_token)
                    .success(function() {
                        $cordovaSpinnerDialog.hide();
                    }).error(function(error) {
                        $cordovaSpinnerDialog.hide();
                        alert("Något gick fel när vi skulle logga ut dig, gå in på google och avaktivera TravMsg för full utloggning.");
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

            authFactory.setUsername = function(username) {
                $sessionStorage.username = username;
            };

            authFactory.getUsername = function() {
                return $sessionStorage.username;
            };

            /**
            * @ngdoc function
            * @name core.Services.Auth#logout
            * @methodOf core.Services.Auth
            */
            authFactory.logout = function() {
                authFactory.googleLogout();
                delete $sessionStorage.token;
                delete $sessionStorage.username;
                $state.go('home');
            };

            return authFactory;
    }
]);
