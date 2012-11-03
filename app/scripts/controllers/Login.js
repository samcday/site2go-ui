(function() {
  'use strict';

  angular.module('site2goUiApp').controller('LoginCtrl', function($scope, $rootScope, $http, Storage) {
    $scope.loginFailed = false;
    $scope.showLogin = false;
    $rootScope.$watch("loggedIn", function(newValue, oldValue) {
      if (newValue !== oldValue) {
        return $scope.showLogin = !newValue;
      }
    });
    return $scope.login = function() {
      /*
            $resource is a godawful mess atm, took all of this below to get a fucking
            promise, and then I discover that custom headers aren't supported by this
            lib in 1.0.2 anyway. fuck. Note the hilarious way we have to escape port
            numbers when we defined RootResource too...
      
            deferred = $q.defer()
            success = (res) ->
              deferred.resolve res
            error = (err) ->
              deferred.reject err
      
            RootResource.get({}, success, error)
      
            deferred.promise.then null, ->
              console.log "oh."
              console.log arguments
      */

      var promise;
      $scope.loginFailed = false;
      $rootScope.authentication.user = $scope.email;
      $rootScope.authentication.pass = $scope.password;
      promise = $http.get("http://localhost:9090/", {
        loginAttempt: true
      });
      promise.success(function() {
        Storage.set("authentication", $rootScope.authentication);
        return $rootScope.loggedIn = true;
      });
      return promise.error(function(data, status) {
        if (status === 401) {
          return $scope.loginFailed = true;
        }
      });
    };
  });

}).call(this);
