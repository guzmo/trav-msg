'use strict';

/**
 * @ngdoc object
 * @name core.Controllers.HomeController
 * @description Home controller
 * @requires ng.$scope
 */
angular.module('core').controller('HomeController', 
  ['$scope', '$state', 'AuthFactory',
 	function($scope, $state, AuthFactory) {

      if (AuthFactory.hasToken()) {
        $state.go('start');
      }
  }
]);
