(function () {
  'use strict';

  angular
    .module('training')
    .controller('TrainingController', TrainingController);

  TrainingController.$inject = ['$scope', '$state', 'Authentication'];

  function TrainingController($scope, $state, Authentication) {
    var vm = this;

    vm.courses = [{
      months: 1,
      choices: '1'
    }, {
      months: 3,
      choices: '3'
    }, {
      months: 6,
      choices: '6'
    }];
  }
}());
