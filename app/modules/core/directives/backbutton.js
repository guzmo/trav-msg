'use strict';

/**
 * @ngdoc directive
 * @name core.Directives.backbutton
 * @description backbutton directive
 */
angular
    .module('core')
    .directive('backbutton', 
        ['DeviceFactory',
        function(DeviceFactory) {
            return {
                template: '<button class="btn btn-primary" ng-if="DeviceFactory.isIphone()" style="float:left;">Back</button>',
                link: function($scope, iElm, iAttrs, controller) {
                    iElm.on('click touchend', function() {
                        history.back();
                    });
                }
            };
        }
    ]);
