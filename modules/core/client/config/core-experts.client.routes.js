(function () {
  'use strict';

  angular
    .module('core.experts.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('experts', {
        abstract: true,
        url: '/experts',
        template: '<ui-view/>',
        data: {
          roles: ['expert']
        }
      });
  }
}());
