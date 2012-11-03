'use strict'



angular.module('site2goUiApp', ['ui', 'ngResource'])
  .config(['$routeProvider', '$httpProvider', ($routeProvider, $httpProvider) ->
    $httpProvider.responseInterceptors.push "loginResponseInterceptor"
    $routeProvider
      .when '/',
        templateUrl: 'views/sites.html'
        controller: 'SitesCtrl'
      .otherwise
        redirectTo: '/'
  ])
  .directive("blurredErrors", ->
    return (scope, element, attrs) ->
      formName = element.closest("form").attr("name")
      fieldName = element.attr("name")
      element.on "blur", ->
        scope[formName][fieldName].showErrors = true
        scope.$digest()
      element.on "focus", ->
        scope[formName][fieldName].showErrors = false
        scope.$digest()
  )
  .factory("RootResource", ($resource, $rootScope) ->
    RootResource = $resource "http://localhost\\:9090/", {}, 
      testicles:
        method: "GET"
        headers:
          sigh: "fucksake."
    return RootResource
  )
  .factory("Base64", ($window) ->
    return $window.base64codec
  )
  .factory("loginResponseInterceptor", ($rootScope, $q, $injector) ->
    return (promise) ->
      success = (resp) -> resp
      failure = (response) ->
        # If this is an authentication fail, we trigger login to display, and
        # then wait for it to succeed, at which point we replay the request and
        # finally satisfy the original promise. Clever, right? 
        console.log response
        if response.status is 401 and not response.config.loginAttempt
          console.log "hijackin'"
          $http = $injector.get "$http"
          deferred = $q.defer()
          $rootScope.loggedIn = false
          watchRegistration = $rootScope.$watch "loggedIn", (newVal, oldVal) ->
            if newVal
              deferred.resolve $http response.config
          return deferred.promise
        return $q.reject response
      promise.then success, failure
  )
  .factory("Storage", ->
    return {
      get: (key) ->
        $.jStorage.get key
      set: (key, val) ->
        $.jStorage.set key, val
    }
  )
  .run ($rootScope, $http, Base64, Storage) ->
    $rootScope.loggedIn = null
    $rootScope.authentication = (Storage.get "authentication") or {}
    $http.defaults.transformRequest = (data, headers) ->
      if $rootScope.authentication.user and $rootScope.authentication.pass
        headers().Authorization = "Basic #{Base64.encodeUtf8("#{$rootScope.authentication.user}:#{$rootScope.authentication.pass}")}"
      return data