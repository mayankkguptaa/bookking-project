(function () {
  'use strict';

  angular
    .module('experts')
    .controller('ExpertChatNavigationController', ExpertChatNavigationController);

  ExpertChatNavigationController.$inject = ['ChatUserService', '$state', 'Socket', 'Authentication'];

  function ExpertChatNavigationController(ChatUserService, $state, Socket, Authentication) {
    var vm = this;

    vm.chatRooms = ChatUserService.query();
    vm.changeChatRoom = changeChatRoom;
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

    function changeChatRoom(room) {
      Socket.emit('switchRoom', room.roomName);
    }
  }
}());
