(function () {
  'use strict';

  angular
    .module('experts')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addSubMenuItem('topbar', 'experts', {
      title: 'Chat',
      state: 'experts.chat.home'
    });

    menuService.addSubMenuItem('topbar', 'experts', {
      title: 'Expert Profile',
      state: 'experts.profile.show'
    });

    menuService.addSubMenuItem('topbar', 'experts', {
      title: 'Edit Profile',
      state: 'experts.profile.edit'
    });
  }
}());
