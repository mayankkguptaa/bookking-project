(function () {
  'use strict';

  angular
    .module('books')
    .controller('BooksController', BooksController);

  BooksController.$inject = ['$scope', '$state', 'bookResolve', '$window', 'Authentication', 'BooksService', '$uibModal', '$log'];

  function BooksController($scope, $state, book, $window, Authentication, BooksService, $uibModal, $log) {
    var vm = this;
    vm.user = Authentication.user;
    vm.book = book;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.canChange = function () {
      if (vm.user.roles[1] === 'admin')
        return true;
      else return false;
    };

    function isAuthorised() {

    }
    // Remove existing Book
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.book.$remove($state.go('books.list'));
      }
    }

    // Save Book
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.bookForm');
        return false;
      }

      if (vm.book._id) {
        vm.book.$update(successCallback, errorCallback);
      } else {
        vm.book.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('books.view', {
          bookId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
