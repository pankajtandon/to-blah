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
            controller: 'ToblahController'
		}
	});

angular
    .module('toblah')
    .controller('ToblahController', ToblahController);

ToblahController.$inject = ['$scope', 'StorageService', 'APP_CONSTANTS', '$log'];

function ToblahController($scope, storageService, appConstants, $log) {
    $scope.toblahList = null;

    $scope.getToblahs = function() {
        $log.debug('Value of type: ' + $scope.type);
        storageService.get(appConstants.type[$scope.type])
            .then(function (response) {
                    $scope.toblahList = response;
                    $log.debug('Got toblahs');
                },
                function(error) {
                    $log.error('error: ' + error);
                });
    };

    $scope.saveToblah = function(toblah) {
        toblah.type = $scope.type;
        storageService.insert(toblah)
            .then(function (r1) {
                storageService.get(toblah.type)
                    .then(function(r2) {
                        $scope.toblahList = r2;
                    });
                $log.debug('saved toblahs');
            },
            function(error) {
                $log.error('error: ' + error);
            });
    };

    $scope.deleteToblah = function(toblah) {
        storageService.delete(toblah)
            .then(function (response) {
                    $scope.toblahList = response;
                    $log.debug('deleted toblah');
                },
                function(error) {
                    $log.error('error: ' + error);
                });
    };

    $scope.getToblahs();
};
