'use strict';

/**
 * @ngdoc directive
 * @name directive:toblah
 * @description
 * # Toblah directive
 */
angular.module('toblah')
	.directive('chalkboard',function() {
		return {
			templateUrl: 'common/directives/chalkboard/chalkboard.html',
			restrict: 'E',
			replace: true,
			scope: {
                type: '@',
                placeholder: '@',
                title: '@'
            },
            controller: 'ToblahController',
            bindToController: true,
            controllerAs: 'vm'
		}
	});

angular
    .module('toblah')
    .controller('ToblahController', ToblahController);

ToblahController.$inject = ['$scope', 'StorageService', 'APP_CONSTANTS', '$log'];

function ToblahController($scope, storageService, appConstants, $log) {
    var vm = this;
    
    vm.toblahList = null;

    vm.getToblahs = function() {
        $log.debug('Value of type: ' + vm.type);
        storageService.get(appConstants.type[vm.type])
            .then(function (response) {
                    vm.toblahList = response;

                    $log.debug('Got toblahs');
                },
                function(error) {
                    $log.error('error: ' + error);
                });
    };

    vm.saveToblah = function(toblah) {
        toblah.type = vm.type;
        storageService.insert(toblah)
            .then(function (r1) {
                storageService.get(toblah.type)
                    .then(function(r2) {
                        vm.toblahList = r2;
                    });
                $log.debug('saved toblahs');
            },
            function(error) {
                $log.error('error: ' + error);
            });
    };

    vm.deleteToblah = function(toblah) {
        storageService.delete(toblah)
            .then(function (response) {
                    vm.toblahList = response;
                    $log.debug('deleted toblah');
                },
                function(error) {
                    $log.error('error: ' + error);
                });
    };

    vm.setCompleteStatus = function(toblah, index) {
        storageService.put(toblah, index)
            .then(function (r1) {
                    storageService.get(toblah.type)
                        .then(function(r2) {
                            vm.toblahList = r2;
                        });
                    $log.debug('updated toblah');
                },
                function(error) {
                    $log.error('error: ' + error);
                });
    };

    vm.clearCompleted = function() {
        storageService.clearCompleted(vm.type)
            .then(function (response) {
                    vm.toblahList = response;
                    $log.debug('cleared completed toblah');
                },
                function(error) {
                    $log.error('error: ' + error);
                });
    };

    vm.getToblahs();
};
