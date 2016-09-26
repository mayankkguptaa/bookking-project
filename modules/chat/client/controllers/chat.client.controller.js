(function () {
  'use strict';

  angular
    .module('chat')
    .controller('ChatController', ChatController);

  ChatController.$inject = ['$scope', '$state', 'Authentication', 'Socket', 'ChatResolve', 'MessagesService'];

  function ChatController($scope, $state, Authentication, Socket, Chat, MessagesService) {
    var vm = this;

    vm.messages = MessagesService.get({ roomName: Chat.roomName });
    vm.messageText = '';
    vm.sendMessage = sendMessage;

    init();

    function init() {
      // If user is not signed in then redirect back home
      if (!Authentication.user) {
        $state.go('home');
      }

      // Add an event listener to the 'chatMessage' event
      Socket.on('updateChat', function (message) {
        vm.messages.unshift(message);
      });

      // Remove the event listener when the controller instance is destroyed
      $scope.$on('$destroy', function () {
        Socket.removeListener('sendChat');
      });
    }

    // Create a controller method for sending messages
    function sendMessage() {
      // Create a new message object
      var message = {
        content: vm.messageText,
        created: Date.now()
      };

      message = new MessagesService(message);
      message.$update({ roomName: Chat.roomName }, function (message) {
        // Emit a 'chatMessage' message event
        Socket.emit('sendChat', { message: message });

        // Clear the message text
        vm.messageText = '';
      }, function (res) {
        vm.messageText = res.data.message;
      });
    }
  }
}());
