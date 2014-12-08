'use strict';

describe('Controller: loginController', function() {

    beforeEach(module('core'));

    var loginController,
        scope;

    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        loginController = $controller('loginController', {
        $scope: scope
        });
    }));

    it('should ...', function() {

    });
});
