'use strict'



angular.module('site2goUiApp', ['ui', 'ngResource'])
  .config(['$routeProvider', ($routeProvider) ->
    $routeProvider
      .when '/',
        templateUrl: 'views/main.html'
        controller: 'MainCtrl'
      .when '/test',
        templateUrl: 'views/main.html'
        controller: 'TestCtrl'
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
  .run ($rootScope, $window) ->
    # $rootScope.showLogin = true