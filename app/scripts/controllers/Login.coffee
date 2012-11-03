'use strict'

angular.module('site2goUiApp')
  .controller 'LoginCtrl', ($scope, $rootScope, $http, Storage) ->
    $scope.loginFailed = false
    $scope.showLogin = false
    $rootScope.$watch "loggedIn", (newValue, oldValue) ->
      $scope.showLogin = !newValue if newValue isnt oldValue
    $scope.login = ->
      ###
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
      ###

      $scope.loginFailed = false
      $rootScope.authentication.user = $scope.email
      $rootScope.authentication.pass = $scope.password

      promise = $http.get "http://localhost:9090/", loginAttempt: true
      promise.success ->
        Storage.set "authentication", $rootScope.authentication
        $rootScope.loggedIn = true
      promise.error (data, status) ->
        if status is 401
          $scope.loginFailed = true