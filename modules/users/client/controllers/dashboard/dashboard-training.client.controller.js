(function () {
  'use strict';

  angular
    .module('users')
    .controller('DashboardTrainingController', DashboardTrainingController);

  DashboardTrainingController.$inject = ['userCoursesService'];

  function DashboardTrainingController(userCoursesService) {
    var vm = this;

    vm.userCourses = userCoursesService.query();
  }
}());
