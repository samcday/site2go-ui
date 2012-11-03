'use strict'

angular.module('site2goUiApp')
  .controller 'MainCtrl', ($scope, $http, $window) ->
    promise = $http.get "http://localhost:9090/sites"
    promise.success (data) ->
      $window.alert "success!"
      $window.alert data
    promise.error ->
      $window.alert "Awh ;("