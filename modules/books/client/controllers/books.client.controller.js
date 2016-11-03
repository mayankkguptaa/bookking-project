(function () {
  'use strict';

  angular
    .module('categories')
    .controller('CategoriesController', CategoriesController);

  CategoriesController.$inject = ['$scope', '$state', 'categoryResolve', '$window', 'Authentication', 'CategoriesService', '$uibModal', '$log'];

  function CategoriesController($scope, $state, category, $window, Authentication, CategoriesService, $uibModal, $log) {
    var vm = this;

    vm.category = category;
    vm.category.materials = CategoriesService.materialList({ categoryId: vm.category._id });
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.open = function (size, material) {
      var modalInstance = $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'modules/categories/client/views/add-material-modal.client.view.html',
        controller: 'AddMaterialModalController',
        controllerAs: 'vm',
        size: size,
        resolve: {
          materialResolve: material
        }
      });

      modalInstance.result.then(function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };

  // Remove existing Category
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.category.$remove($state.go('admin.categories.list'));
      }
    }

    // Save Category
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.categoryForm');
        return false;
      }

      if (vm.category._id) {
        vm.category.$update(successCallback, errorCallback);
      } else {
        vm.category.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('admin.categories.view', {
          categoryId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }

  angular
    .module('categories')
    .controller('AddMaterialModalController', AddMaterialModalController);

  AddMaterialModalController.$inject = ['$uibModalInstance', 'materialResolve', 'FileUploader', '$window', '$timeout'];

  function AddMaterialModalController($uibModalInstance, material, FileUploader, $window, $timeout) {
    var vm = this;

    vm.material = material;
    vm.uploadMaterial = uploadMaterial;
    vm.fileURL = '';
    vm.cancelUpload = cancelUpload;

    vm.closeModal = function () {
      $uibModalInstance.dismiss('cancel');
    };

    // Create file uploader instance
    vm.uploader = new FileUploader({
      url: 'api/materials/' + vm.material._id,
      alias: 'newMaterial',
      onAfterAddingFile: onAfterAddingFile,
      onSuccessItem: onSuccessItem,
      onErrorItem: onErrorItem
    });

    // Set file uploader image filter
    vm.uploader.filters.push({
      name: 'fileFilter',
      fn: function (item, options) {
        var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
        return '|mp4|avi|mkv|pdf|'.indexOf(type) !== -1;
      }
    });

    // Called after the user selected a new picture file
    function onAfterAddingFile(fileItem) {
      if ($window.FileReader) {
        var fileReader = new FileReader();
        fileReader.readAsDataURL(fileItem._file);

        fileReader.onload = function (fileReaderEvent) {
          $timeout(function () {
            vm.fileURL = fileReaderEvent.target.result;
          }, 0);
        };
      }
    }

    // Called after the user has successfully uploaded a new picture
    function onSuccessItem(fileItem, response, status, headers) {
      // Show success message
      vm.success = true;

      vm.material = response;

      // Clear upload buttons
      cancelUpload();
    }

    // Called after the user has failed to uploaded a new picture
    function onErrorItem(fileItem, response, status, headers) {
      // Clear upload buttons
      cancelUpload();

      // Show error message
      vm.error = response.message;
    }

    // Change user profile picture
    function uploadMaterial() {
      // Clear messages
      vm.success = vm.error = null;

      // Start upload
      vm.uploader.uploadAll();
    }

    // Cancel the upload process
    function cancelUpload() {
      vm.uploader.clearQueue();
      vm.fileURL = '';
    }
  }
}());
