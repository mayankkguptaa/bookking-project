(function () {
  'use strict';

  angular
    .module('training.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('training', {
        abstract: true,
        url: '/training',
        template: '<ui-view/>'
      })
      .state('training.home', {
        url: '',
        templateUrl: 'modules/training/client/views/training.client.view.html',
        controller: 'TrainingController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Training'
        }
      })
      .state('training.months', {
        url: '/:months-month-course',
        templateUrl: 'modules/training/client/views/training-months.client.view.html',
        controller: 'TrainingMonthsController',
        controllerAs: 'vm',
        resolve: {
          months: getMonths
        },
        data: {
          pageTitle: 'Training - {{ months }} months'
        }
      })
      .state('training.payment', {
        url: '/:userCourseId/payment',
        templateUrl: 'modules/training/client/views/training-payment.client.view.html',
        controller: 'TrainingPaymentController',
        controllerAs: 'vm',
        resolve: {
          userCourseResolve: getUserCourse
        },
        data: {
          pageTitle: 'Training - Payment'
        }
      })
      .state('training.termsAndConditionsTraining', {
        url: '/training-terms-and-conditions',
        templateUrl: 'modules/training/client/views/training-terms-and-conditions.client.view.html'        
      });
  }
}());

getMonths.$inject = ['$stateParams'];

function getMonths($stateParams) {
  return $stateParams.months;
}

getUserCourse.$inject = ['$stateParams', 'UserCoursesService'];

function getUserCourse($stateParams, UserCourseService) {
  return UserCourseService.get({ userCourseId: $stateParams.userCourseId }).$promise;
}
