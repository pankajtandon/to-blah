'use strict';

/**
 * @ngdoc directive
 * @name directive:Header
 * @description
 * # header directive
 */
angular.module('toblah')
	.directive('header',function(){
        console.log('in header!');
		return {
            templateUrl: 'common/directives/header/header.html',
            restrict: 'E',
            replace: true
    	}
	});


