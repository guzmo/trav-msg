'use strict';

/**
 * @ngdoc object
 * @name core.Controllers.OwnerStartPageController
 * @description OwnerStartPageController
 * @requires ng.$scope
*/
angular
    .module('core')
    .controller('OwnerStartPageController', 
        ['$scope', 'AuthFactory',
        function($scope, AuthFactory) {
        	var date = new Date();
        	
        	var firstDate = new Date();
			firstDate.setDate(firstDate.getDate() - 1);
        	
        	
        	var second = new Date();
        	second.setDate(second.getDate() - 2);
        
        	$scope.entries = [
        		{
        			coach: 'Yngve karlsson',
                    horseName: 'horsey',
                    activity: 'Sprint',
        			message: 'Idag gick det bra',
        			created: new Date()
        		},
        		{
        			coach: 'Lena lisseson',
                    horseName: 'DogMeat',
                    activity: 'Interval',
        			message: 'Hästen är pigg',
        			created: second
        		},
        		{
        			coach: 'Gösta åkesson',
                    activity: 'Banjobb',
                    horseName: 'Flash Gordon',
        			message: 'Puls -100, helt ok',
        			created: firstDate
        		}
        	];

            $scope.username = AuthFactory.getUsername();

            console.log($scope.username);

        }
]);
