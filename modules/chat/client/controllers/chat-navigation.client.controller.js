(function () {
  'use strict';

  angular
    .module('chat')
    .controller('ChatNavigationController', ChatNavigationController);

  ChatNavigationController.$inject = ['ExpertsService', '$state', 'Socket', 'Authentication'];

  function ChatNavigationController(ExpertsService, $state, Socket, Authentication) {
    var vm = this;

    vm.experts = ExpertsService.query();
    vm.changeExpert = changeExpert;
    vm.user = Authentication.user;

    init();

    function init() {
      if (!Socket.socket) {
        Socket.connect();
      }

      Socket.on('connect', function () {
        Socket.emit('addUser', { username: vm.user.username });
      });
    }

    function changeExpert(expert) {
      Socket.emit('switchRoom', expert.user.username + vm.user.username);
    }
  }
}());
