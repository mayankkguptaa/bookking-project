(function () {
  'use strict';

  angular
    .module('experts')
    .controller('ExpertProfileEditController', ExpertProfileEditController);

  ExpertProfileEditController.$inject = ['$scope', '$http', '$location', 'Authentication', 'ExpertsService'];

  function ExpertProfileEditController($scope, $http, $location, Authentication, ExpertsService) {
    var vm = this;

    vm.user = Authentication.user;
    vm.expert = {};
    vm.updateExpertProfile = updateExpertProfile;

    getExpert();

    function getExpert() {
      ExpertsService.get(function (res) {
        vm.expert = res;
      });
    }

    // update expert profile
    function updateExpertProfile(isValid) {
      vm.success = vm.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.expertForm');

        return false;
      }

      var expert = new ExpertsService(vm.expert);

      expert.$update(function (response) {
        $scope.$broadcast('show-errors-reset', 'vm.expertForm');

        vm.success = true;
        vm.expert = response;
      }, function (response) {
        vm.error = response.data.message;
      });
    }
  }
}());
