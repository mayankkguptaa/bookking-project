(function () {
  'use strict';

  angular
    .module('experts.chat.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('experts.chat', {
        abstract: true,
        url: '/chat',
        templateUrl: 'modules/experts/client/views/chat/chat-navigation.client.view.html',
        controller: 'ExpertChatNavigationController',
        controllerAs: 'vm'
      })
      .state('experts.chat.home', {
        url: '',
        templateUrl: 'modules/experts/client/views/chat/chat-home.client.view.html',
        data: {
          pageTitle: 'Chat - Home'
        }
      })
      .state('experts.chat.user', {
        url: '/:userId',
        templateUrl: 'modules/experts/client/views/chat/chat.client.view.html',
        controller: 'ExpertChatController',
        controllerAs: 'vm',
        resolve: {
          ChatResolve: getChatRoom
        },
        data: {
          pageTitle: 'Chat - {{ ChatResolve.user.username }}'
        }
      });

    getChatRoom.$inject = ['$stateParams', 'ChatUserService'];

    function getChatRoom($stateParams, ChatUserService) {
      return ChatUserService.get({ userId: $stateParams.userId }).$promise;
    }
  }
}());
