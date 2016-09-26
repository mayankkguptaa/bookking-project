(function () {
  'use strict';

  angular
    .module('experts')
    .controller('ExpertProfileShowController', ExpertProfileShowController);

  ExpertProfileShowController.$inject = ['$scope', 'Authentication', 'ExpertsService'];

  function ExpertProfileShowController($scope, Authentication, ExpertsService) {
    var vm = this;

    vm.user = Authentication.user;
    vm.expert = {};

    getExpert();

    function getExpert() {
      ExpertsService.get(function (res) {
        vm.expert = res;
      });
    }
  }
}());
