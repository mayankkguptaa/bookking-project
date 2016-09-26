(function () {
  'use strict';

  angular
    .module('experts.profile.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('experts.profile', {
        abstract: true,
        url: '/profile',
        templateUrl: 'modules/experts/client/views/profile/profile-navigation.client.view.html',
        controller: 'ExpertProfileNavigationController',
        controllerAs: 'vm'
      })
      .state('experts.profile.show', {
        url: '',
        templateUrl: 'modules/experts/client/views/profile/profile-show.client.view.html',
        controller: 'ExpertProfileShowController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Expert Profile'
        }
      })
      .state('experts.profile.edit', {
        url: '/edit',
        templateUrl: 'modules/experts/client/views/profile/profile-edit.client.view.html',
        controller: 'ExpertProfileEditController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Edit Profile'
        }
      });
  }
}());
