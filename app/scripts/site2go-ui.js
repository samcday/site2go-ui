(function() {
  'use strict';

  angular.module('site2goUiApp', ['ui', 'ngResource']).config([
    '$routeProvider', function($routeProvider) {
      return $routeProvider.when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      }).when('/test', {
        templateUrl: 'views/main.html',
        controller: 'TestCtrl'
      }).otherwise({
        redirectTo: '/'
      });
    }
  ]).directive("blurredErrors", function() {
    return function(scope, element, attrs) {
      var fieldName, formName;
      formName = element.closest("form").attr("name");
      fieldName = element.attr("name");
      element.on("blur", function() {
        scope[formName][fieldName].showErrors = true;
        return scope.$digest();
      });
      return element.on("focus", function() {
        scope[formName][fieldName].showErrors = false;
        return scope.$digest();
      });
    };
  }).factory("RootResource", function($resource, $rootScope) {
    var RootResource;
    RootResource = $resource("http://localhost\\:9090/", {}, {
      testicles: {
        method: "GET",
        headers: {
          sigh: "fucksake."
        }
      }
    });
    return RootResource;
  }).factory("Base64", function($window) {
    return $window.base64codec;
  }).run(function($rootScope, $window) {});

}).call(this);
