(function () {
  'use strict';

  angular
    .module('chat.services').factory('MessagesService', MessagesService);

  MessagesService.$inject = ['$resource'];

  function MessagesService($resource) {
    return $resource('api/chat/messages/:roomName', {
      roomName: '@_name'
    }, {
      update: {
        method: 'POST',
        params: { roomName: '@_name' }
      },
      get: {
        method: 'GET',
        isArray: true
      }
    });
  }

  angular
    .module('chat.services').factory('ThreadsService', ThreadsService);

  ThreadsService.$inject = ['$resource'];

  function ThreadsService($resource) {
    return $resource('api/chat/experts/:expertId', {
      expertId: '@_id'
    });
  }
}());
