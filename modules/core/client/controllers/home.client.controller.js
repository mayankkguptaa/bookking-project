(function () {
  'use strict';

  angular
    .module('core')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['ExpertsService', '$uibModal', '$log', 'Authentication', '$state'];

  function HomeController(ExpertsService, $uibModal, $log, Authentication, $state) {
    var vm = this;

    vm.experts = [];
    vm.user = Authentication.user;
    vm.animationsEnabled = true;
    vm.canNotSubmitAdMsg = false;
    vm.open = open;
    vm.submitBookAdClicked = submitBookAdClicked;

    ExpertsService.query(function (res) {
      vm.experts = res;
    });

    function open(size) {

      var modalInstance = $uibModal.open({
        animation: vm.animationsEnabled,
        templateUrl: 'modules/core/client/views/testimonial-modal.client.view.html',
        controller: 'TestimonialModal',
        controllerAs: 'vm',
        size: size
      });

      modalInstance.result.then(function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    }

    function submitBookAdClicked() {
      if (vm.user) {
        $state.go('books.create');
      } else {
        vm.canNotSubmitAdMsg = true;
      }
    }
  }

  angular
    .module('core')
    .controller('TestimonialModal', TestimonialModal);

  TestimonialModal.$inject = ['$uibModalInstance'];

  function TestimonialModal($uibModalInstance) {
    var vm = this;

    vm.ok = function () {
      $uibModalInstance.close();
    };

    vm.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  }
}());
