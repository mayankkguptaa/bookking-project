(function () {
  'use strict';

  angular
    .module('users')
    .controller('DashboardNavigationController', DashboardNavigationController);

  DashboardNavigationController.$inject = ['Authentication', '$scope'];

  function DashboardNavigationController(Authentication, $scope) {
    var vm = this;

    vm.user = Authentication.user;
  }
}());
