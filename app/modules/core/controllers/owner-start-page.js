'use strict';

/**
 * @ngdoc object
 * @name core.Controllers.OwnerStartPageController
 * @description OwnerStartPageController
 * @requires ng.$scope
*/
angular
    .module('core')
    .controller('OwnerStartPageController', [
        '$scope',
        function($scope) {
        	var date = new Date();
        	
        	var firstDate = new Date();
			firstDate.setDate(firstDate.getDate() - 1);
        	
        	
        	var second = new Date();
        	second.setDate(second.getDate() - 2);
        
        	$scope.entries = [
        		{
        			coach: 'Yngve karlsson',
        			message: 'Idag gick det bra',
        			created: new Date()
        		},
        		{
        			coach: 'Lena lisseson',
        			message: 'Hästen är pigg',
        			created: second
        		},
        		{
        			coach: 'Gösta åkesson',
        			message: 'Puls -100, helt ok',
        			created: firstDate
        		}
        	];

        }
]);
