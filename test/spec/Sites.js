(function() {
  'use strict';

  describe('Controller: SitesCtrl', function() {
    var SitesCtrl, scope;
    beforeEach(module('site2goUiApp'));
    SitesCtrl = {};
    scope = {};
    beforeEach(inject(function($controller) {
      scope = {};
      return SitesCtrl = $controller('SitesCtrl', {
        $scope: scope
      });
    }));
    return it('should attach a list of awesomeThings to the scope', function() {
      return expect(scope.awesomeThings.length).toBe(3);
    });
  });

}).call(this);
