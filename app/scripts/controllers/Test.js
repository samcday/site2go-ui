(function() {
  'use strict';

  angular.module('site2goUiApp').controller('TestCtrl', function($rootScope, $scope, $window) {
    return $rootScope.loggedIn = true;
  });

}).call(this);
