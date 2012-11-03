(function() {
  'use strict';

  describe('Controller: TestCtrl', function() {
    var TestCtrl, scope;
    beforeEach(module('site2goUiApp'));
    TestCtrl = {};
    scope = {};
    beforeEach(inject(function($controller) {
      scope = {};
      return TestCtrl = $controller('TestCtrl', {
        $scope: scope
      });
    }));
    return it('should attach a list of awesomeThings to the scope', function() {
      return expect(scope.awesomeThings.length).toBe(3);
    });
  });

}).call(this);
