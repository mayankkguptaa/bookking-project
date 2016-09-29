(function () {
  'use strict';

  angular
    .module('training')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'About Us',
      state: 'about',
      roles: ['*']
    });

    menuService.addMenuItem('topbar', {
      title: 'FAQ',
      state: 'faq',
      roles: ['*']
    });

    menuService.addMenuItem('topbar', {
      title: 'Contact Us',
      state: 'contactUs',
      roles: ['*']
    });
  }
}());
