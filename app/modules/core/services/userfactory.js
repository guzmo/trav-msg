'use strict';

/**
 * @ngdoc service
 * @name core.Services.UserFactory
 * @description UserFactory Factory
 */
angular
    .module('core')
    .factory('UserFactory',
        ['Firebase', 'DeviceFactory',
        function(Firebase, DeviceFactory) {

            var userFactory = {};
            userFactory.myFirebaseRef = new Firebase("https://travmsg.firebaseio.com/user");
            /**
             * @ngdoc function
             * @name core.Services.UserFactory#create
             * @methodOf core.Services.UserFactory
             */
            userFactory.create = function(data) {
                userFactory.myFirebaseRef.push(data);
            };

            userFactory.createIfNotExists = function(data) {
                var user = {};
                user.givenName = data.name.givenName;
                user.email = data.emails[0].value;
                user.device = [DeviceFactory.getUUID()];
                console.log(DeviceFactory.isIphone());
                console.log(userFactory.get(data.id, user.device));
                userFactory.myFirebaseRef.child(data.id).set(user);
            };

            userFactory.update = function(data) {
                userFactory.myFirebaseRef.update(data);
            };

            userFactory.delete = function(user) {
                userFactory.myFirebaseRef.remove(user);
            };

            userFactory.get = function(user_id, device_id) {
                var user = userFactory.myFirebaseRef.once(user_id, function(data) {
                    console.log("SADASSADSDAASDASDASDSADASDADSASDASD");
                    console.log(data);
                });
                console.log("user");
                console.log(user);
                return user !== null && $.inArray(device_id, user.devices) !== -1;
            };

            return userFactory;
    }
]);
