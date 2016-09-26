(function () {
  'use strict';

  angular
    .module('training')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Training',
      state: 'training.home',
      roles: ['*']
    });

    menuService.addMenuItem('topbar', {
      title: 'Examination',
      state: 'examination.home',
      roles: ['*']
    });

    menuService.addMenuItem('topbar', {
      title: 'Recruitment',
      state: 'recruitment.home',
      roles: ['*']
    });
  }
}());
