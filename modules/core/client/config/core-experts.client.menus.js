(function () {
  'use strict';

  angular
    .module('core.experts')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Experts Panel',
      state: 'experts',
      type: 'dropdown',
      roles: ['expert'],
      position: 5
    });
  }
}());
