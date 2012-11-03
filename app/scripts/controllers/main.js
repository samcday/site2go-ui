(function() {
  'use strict';

  angular.module('site2goUiApp').controller('MainCtrl', function($scope, $http, $window) {
    var promise;
    promise = $http.get("http://localhost:9090/sites");
    promise.success(function(data) {
      $window.alert("success!");
      return $window.alert(data);
    });
    return promise.error(function() {
      return $window.alert("Awh ;(");
    });
  });

}).call(this);
