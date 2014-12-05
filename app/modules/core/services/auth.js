'use strict';

/**
 * @ngdoc service
 * @name core.Services.Auth
 * @description Auth Factory
 */
angular.module('core').factory('AuthFactory',['$state', '$sessionStorage', function($state, $sessionStorage) {

            var authFactory = {};

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


            authFactory.logout = function() {
                delete $sessionStorage.token;
                $state.go('/');
            };

            return authFactory;
    }]);
