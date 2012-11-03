'use strict'

angular.module('site2goUiApp')
  .controller 'TestCtrl', ($rootScope, $scope, $window) ->
    $rootScope.loggedIn = true