(function() {
  'use strict';

  describe('Controller: LoginCtrl', function() {
    var LoginCtrl, scope;
    beforeEach(module('site2goUiApp'));
    LoginCtrl = {};
    scope = {};
    beforeEach(inject(function($controller) {
      scope = {};
      return LoginCtrl = $controller('LoginCtrl', {
        $scope: scope
      });
    }));
    return it('should attach a list of awesomeThings to the scope', function() {
      return expect(scope.awesomeThings.length).toBe(3);
    });
  });

}).call(this);
