'use strict';

/**
 * @ngdoc directive
 * @name core.Directives.auth
 * @description auth directive
 */
angular.module('core').directive('oauth', 
    ['$cordovaOauth', '$state', 'AuthFactory',
    function($cordovaOauth, $state, AuthFactory) {
        return {
            // name: '',
            // priority: 1,
            // terminal: true,
            // scope: {}, // {} = isolate, true = child, false/undefined = no change
            // controller: function($scope, $element, $attrs, $transclude) {},
            // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
            // restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
            // template: '',
            templateUrl: 'modules/core/views/auth.html',
            link: function($scope, iElm, iAttrs, controller) {
               $scope.googleLogin = function() {
                    AuthFactory.googleLogin();
                };

                $scope.isLoggedIn = function() {
                    return AuthFactory.hasToken();
                };

                $scope.logout = function() {
                    AuthFactory.logout();
                };
            }
        };
    }
]);
