(function() {
  'use strict';

  angular.module('site2goUiApp', ['ui', 'ngResource']).config([
    '$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
      $httpProvider.responseInterceptors.push("loginResponseInterceptor");
      return $routeProvider.when('/', {
        templateUrl: 'views/sites.html',
        controller: 'SitesCtrl'
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
  }).factory("loginResponseInterceptor", function($rootScope, $q, $injector) {
    return function(promise) {
      var failure, success;
      success = function(resp) {
        return resp;
      };
      failure = function(response) {
        var $http, deferred, watchRegistration;
        console.log(response);
        if (response.status === 401 && !response.config.loginAttempt) {
          console.log("hijackin'");
          $http = $injector.get("$http");
          deferred = $q.defer();
          $rootScope.loggedIn = false;
          watchRegistration = $rootScope.$watch("loggedIn", function(newVal, oldVal) {
            if (newVal) {
              return deferred.resolve($http(response.config));
            }
          });
          return deferred.promise;
        }
        return $q.reject(response);
      };
      return promise.then(success, failure);
    };
  }).factory("Storage", function() {
    return {
      get: function(key) {
        return $.jStorage.get(key);
      },
      set: function(key, val) {
        return $.jStorage.set(key, val);
      }
    };
  }).run(function($rootScope, $http, Base64, Storage) {
    $rootScope.loggedIn = null;
    $rootScope.authentication = (Storage.get("authentication")) || {};
    return $http.defaults.transformRequest = function(data, headers) {
      if ($rootScope.authentication.user && $rootScope.authentication.pass) {
        headers().Authorization = "Basic " + (Base64.encodeUtf8("" + $rootScope.authentication.user + ":" + $rootScope.authentication.pass));
      }
      return data;
    };
  });

}).call(this);
