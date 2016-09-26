(function () {
  'use strict';

  angular
    .module('training')
    .controller('TrainingPaymentController', TrainingPaymentController);

  TrainingPaymentController.$inject = ['userCourseResolve', '$state'];

  function TrainingPaymentController(userCourse, $state) {
    var vm = this;

    vm.cost = userCourse.cost;
    vm.userCourse = userCourse;
    vm.paymentDone = paymentDone;

    function paymentDone() {
      $state.go('userProfile');
    }
  }
}());
