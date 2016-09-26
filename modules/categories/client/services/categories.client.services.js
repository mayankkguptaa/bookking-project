(function () {
  'use strict';

  angular
    .module('categories.services')
    .factory('CategoriesService', CategoriesService);

  CategoriesService.$inject = ['$resource'];

  function CategoriesService($resource) {
    return $resource('api/categories/:categoryId/:temp', {
      categoryId: '@_id',
      temp: ''
    }, {
      update: {
        method: 'PUT'
      },
      materialList: {
        method: 'GET',
        params: { temp: 'materials' },
        isArray: true
      }
    });
  }

  angular
    .module('categories.services')
    .factory('MaterialsService', MaterialsService);

  MaterialsService.$inject = ['$resource'];

  function MaterialsService($resource) {
    return $resource('api/materials/:materialId', {
      materialId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
