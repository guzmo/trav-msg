'use strict';

/**
 * @ngdoc object
 * @name core.Controllers.HomeController
 * @description Home controller
 * @requires ng.$scope
 */
angular.module('core').controller('HomeController', 
  ['$scope', '$state', 'Firebase', 'AuthFactory',
 	function($scope, $state, Firebase, AuthFactory) {

      if (AuthFactory.hasToken()) {
        $state.go('start');
      }
 		 
 		// var myFirebaseRef = new Firebase("https://boiling-torch-6275.firebaseio.com/");
 		// myFirebaseRef.child("location").set({
 		// 	title: "Hello World!",
 		// 	author: "Firebase",
 		// 	location: {
 		// 		city: "San Francisco",
 		// 		state: "California",
 		// 		zip: 94103
 		// 	}
 		// });

 		// myFirebaseRef.child("location").on("value", function(snapshot) {
  	// 		alert(snapshot.val());  // Alerts "San Francisco"
  	// 	});

  }
]);
