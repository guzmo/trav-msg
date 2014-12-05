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
            // replace: true,
            // transclude: true,
            // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
            link: function($scope, iElm, iAttrs, controller) {
               $scope.googleLogin = function() {
                    console.log("googleLogin");
                    $cordovaOauth.google("229108461520-kto8p350n74qgla7erokj8ufui13b9to.apps.googleusercontent.com", 
                        ['email', 'username']).then(function(result) {
                        AuthFactory.setToken(result);
                        $state.go('start');
                    }, function(error) {
                        console.log("error " + error);
                    });
                };

                $scope.isLoggedIn = function() {
                    return AuthFactory.hasToken();
                };

                $scope.logout = function() {
                    AuthFactory.logout();
                    $state.go('/');
                };
            }
        };
    }
]);
