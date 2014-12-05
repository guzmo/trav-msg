'use strict';

/**
 * @ngdoc service
 * @name core.Services.Pushfactory
 * @description Pushfactory Factory
 */
angular.module('core').factory('Pushfactory', 
    ['$cordovaPush',
    function($cordovaPush) {
            



        document.addEventListener("deviceready", function () {
            console.log($cordovaPush);
            var config = {
                "senderID":"229108461520",
                "ecb":"window.onNotification"
            };

             $cordovaPush.register(config).then(function(result) {
                    console.log('register success: ' + result);
                }, function(err) {
                    console.log('register err: ' + result);
             });

                // $cordovaPush.unregister(options).then(function(result) {
                //  alert('unregister success: ' + result);
                // }, function(err) {
                //  alert('unregister err: ' + result);
                // });

        });

        $scope.$on('pushNotificationReceived', function(event, notification) {
           alert("got push");
        });


    }
]);


window.onNotification = function(e) {
    console.log("GOT EVENT");
    console.log(e);
    switch( e.event ) {
        case 'registered':
            if ( e.regid.length > 0 ) {
                console.log(e.regid);
                alert("Your regID is : " + e.regid);
            }
            break;
        case 'message':
            // this is the actual push notification. its format depends on the data model     from the push server
            alert(e);
            alert('message = '+ e.message);
            angular.element(document.querySelector('#yata')).html(e.message);
            break;
        case 'error':
            alert('GCM error = '+e.msg);
            break;

        default:
            alert('An unknown GCM event has occurred');
            break;
    }
};