'use strict';

/**
 * @ngdoc service
 * @name core.Services.DeviceFactory
 * @description DeviceFactory Factory
 */
angular.module('core').factory('DeviceFactory',
    ['$cordovaDevice',
    function($cordovaDevice) {
        var deviceFactory = {};

        deviceFactory.getUUID = function() {
            return $cordovaDevice.getUUID();
        };

        deviceFactory.isIphone = function() {
            return $cordovaDevice.getPlatform().toLowerCase() === 'iphone';
        };

        return deviceFactory;
    }
]);
