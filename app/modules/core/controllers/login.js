'use strict';

/**
 * @ngdoc object
 * @name core.Controllers.LoginController
 * @description LoginController
 * @requires ng.$scope
*/
angular
    .module('core')
    .controller('LoginController', ['$scope', 'AuthFactory',
        function($scope, AuthFactory) {
        	$scope.isLoggedIn = function() {
        		console.log("Are we logged in? " + AuthFactory.hasToken());
        		return AuthFactory.hasToken();
        	};

        	$scope.logout = function() {
        		AuthFactory.logout();
        	};

        	$scope.login = function() {
        		console.log("google login");
        		AuthFactory.googleLogin();
        	};
        }
]);
