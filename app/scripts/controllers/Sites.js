(function() {
  'use strict';

  angular.module('site2goUiApp').controller('SitesCtrl', function($scope, $http, $window) {
    return $scope.sites = ($http.get("http://localhost:9090/sites")).then(function(resp) {
      return resp.data;
    });
    /*promise.success (data) ->
      $window.alert "success!"
      $window.alert data
    promise.error ->
      $window.alert "Awh ;("
    */

  });

}).call(this);
