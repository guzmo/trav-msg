'use strict';

/**
 * @ngdoc object
 * @name core.Controllers.HomeController
 * @description Home controller
 * @requires ng.$scope
 */
 angular
 .module('core')
 .controller('HomeController', ['$scope', 'Firebase', '$cordovaPush',
 	function($scope, Firebase, $cordovaPush) {
 		 document.addEventListener("deviceready", function () {
 		 	console.log($cordovaPush);
 		 	var config = {
 		 		"senderID":"229108461520"
 		 		//"ecb":myCustomOnNotificationAPNHandler
 		 	};


 		 	$cordovaPush.onNotification = function(event) {
 		 		console.log("WTF?");
 		 	};

  	 	 $cordovaPush.register(config).then(function(result) {
  	 			console.log('register success: ' + result);
  	 		}, function(err) {
  	 	 		console.log('register err: ' + result);
  	 	 });

 				// $cordovaPush.unregister(options).then(function(result) {
 				// 	alert('unregister success: ' + result);
 				// }, function(err) {
 				// 	alert('unregister err: ' + result);
 				// });

 		});


 		
 		window.onNotification = function(event) {
 			console.log(event);
 		};

 		$scope.$on('onNotification', function(event) {
 			console.log("Scope " + event);
 		});

 		 			// receive notification
 		$scope.$on('pushNotificationReceived', function(event, notification) {
 			console.log('received: ' + notification);
 		})

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
