(function () {
  'use strict';

  angular
    .module('experts.services')
    .factory('ChatUserService', ChatUserService);

  ChatUserService.$inject = ['$resource'];

  function ChatUserService($resource) {
    return $resource('api/chat/users/:userId', {
      userId: '@_id'
    }, {
      query: {
        isArray: true
      }
    });
  }

  // Experts service used for communicating with the users REST endpoint
  angular
    .module('experts.services')
    .factory('ExpertsService', ExpertsService);

  ExpertsService.$inject = ['$resource'];

  function ExpertsService($resource) {
    return $resource('api/experts/:id', {
      id: 'me'
    }, {
      update: {
        method: 'PUT'
      },
      query: {
        method: 'GET',
        params: { id: '' },
        isArray: true
      }
    });
  }
}());
