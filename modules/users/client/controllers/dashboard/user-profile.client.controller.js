(function () {
  'use strict';

  angular
    .module('users')
    .controller('UserProfileController', UserProfileController);

  UserProfileController.$inject = ['Authentication', '$state'];

  function UserProfileController(Authentication, $state) {
    var vm = this;
    vm.user = Authentication.user;
    vm.dateFormat = dateFormat;

    function dateFormat(datestring) {
      vm.dobtemp = new Date(datestring);
      var month = [];
      month[0] = 'January';
      month[1] = 'February';
      month[2] = 'March';
      month[3] = 'April';
      month[4] = 'May';
      month[5] = 'June';
      month[6] = 'July';
      month[7] = 'August';
      month[8] = 'September';
      month[9] = 'October';
      month[10] = 'November';
      month[11] = 'December';
      vm.dobformatted = vm.dobtemp.getDate() + ' - ' + month[vm.dobtemp.getMonth()] + ' - ' + vm.dobtemp.getYear();
      return vm.dobformatted;
    }
  }
}());
