(function () {
  'use strict';
  
  angular
    .module('training.services')
    .factory('UserCoursesService', UserCoursesService);

  UserCoursesService.$inject = ['$resource'];
  
  function UserCoursesService($resource) {
    return $resource('api/courses/:userCourseId', {
      userCourseId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
