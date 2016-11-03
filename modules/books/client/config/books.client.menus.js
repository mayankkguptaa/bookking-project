(function () {
  'use strict';

  angular
    .module('categories')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  // Configuring categories module
  function menuConfig(menuService) {

  }
}());
