'use strict';

describe('Controller: auth-controllerController', function() {

    beforeEach(module('core'));

    var auth-controllerController,
        scope;

    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        auth-controllerController = $controller('auth-controllerController', {
        $scope: scope
        });
    }));

    it('should ...', function() {

    });
});
