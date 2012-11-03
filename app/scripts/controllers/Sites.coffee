'use strict'

angular.module('site2goUiApp')
  .controller 'SitesCtrl', ($scope, $http, $window) ->
    $scope.sites = ($http.get "http://localhost:9090/sites").then (resp) -> resp.data
    ###promise.success (data) ->
      $window.alert "success!"
      $window.alert data
    promise.error ->
      $window.alert "Awh ;("
    ###