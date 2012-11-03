'use strict'

describe 'Controller: SitesCtrl', () ->

  # load the controller's module
  beforeEach module 'site2goUiApp'

  SitesCtrl = {}
  scope = {}

  # Initialize the controller and a mock scope
  beforeEach inject ($controller) ->
    scope = {}
    SitesCtrl = $controller 'SitesCtrl', {
      $scope: scope
    }

  it 'should attach a list of awesomeThings to the scope', () ->
    expect(scope.awesomeThings.length).toBe 3;
