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
    vm.submitTestimonialClicked = submitTestimonialClicked;
    vm.canNotSubmitTestimonialMsg = false;

    ExpertsService.query(function (res) {
      vm.experts = res;
    });

    function open(size) {

      var modalInstance = $uibModal.open({
        animation: vm.animationsEnabled,
        templateUrl: 'modules/core/client/views/testimonial-modal.client.view.html',
        controller: 'ModalCtrl',
        controllerAs: 'vm',
        size: size
      });

      modalInstance.result.then(function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    }

    function submitTestimonialClicked() {
      if (!vm.user) {
        vm.canNotSubmitTestimonialMsg = true;
      } else vm.open('lg');
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
    .controller('ModalCtrl', ModalCtrl);

  ModalCtrl.$inject = ['Authentication', '$uibModalInstance', '$state', '$scope'];

  function ModalCtrl(Authentication, $uibModalInstance, $state, $scope) {
    var vm = this;

    vm.user = Authentication.user;
    vm.save = save;

    // Save Testimonial
    function save() {

      vm.testimonial.$save(successCallback, errorCallback);

      function successCallback(res) {
        vm.cancel();
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }

    vm.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  }
}());
