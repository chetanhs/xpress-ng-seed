var filterModule = angular.module('filters', []);
var directiveModule = angular.module('directives', []);

var app = angular.module('app', ['ngResource', 'ngRoute', 'ngSanitize', 'filters', 'directives'])
  .config(function ($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: '/partials/index.html',
        controller: 'HomeCtrl'
      })
  })