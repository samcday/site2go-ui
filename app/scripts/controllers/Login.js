(function() {
  'use strict';

  angular.module('site2goUiApp').controller('LoginCtrl', function($scope, $q, $http, Base64) {
    console.log(Base64);
    $scope.showLogin = false;
    $scope.$watch("loggedIn", function(newValue, oldValue) {
      if (newValue !== oldValue) {
        return $scope.showLogin = newValue;
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
      promise = $http({
        method: "GET",
        url: "http://localhost:9090/",
        headers: {
          authorization: "Basic " + (Base64.encodeUtf8("" + $scope.email + ":" + $scope.password))
        }
      });
      return promise.then(null, function() {
        return console.log("k .", arguments);
      });
    };
  });

}).call(this);