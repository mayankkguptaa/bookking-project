(function () {
  'use strict';

  angular
    .module('core')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['ExpertsService', '$uibModal', '$log', 'Authentication'];

  function HomeController(ExpertsService, $uibModal, $log, Authentication) {
    var vm = this;

    vm.experts = [];
    vm.user = Authentication.user;
    vm.animationsEnabled = true;
    vm.canNotSubmitTestimonialMsg = false;
    vm.open = open;
    vm.submitTestimonialClicked = submitTestimonialClicked;
    
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
    
    function submitTestimonialClicked() {
      if (vm.user) {
        vm.open('lg');
      } else {
        vm.canNotSubmitTestimonialMsg = true;
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
