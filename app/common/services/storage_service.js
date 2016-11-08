angular.module('toblah')
	.factory('StorageService', function ($q, APP_CONSTANTS, $log) {
		'use strict';

		return {
			toblahs: {
				todo: [],
				tobuy: [],
				tolearn: [],
				tovisit: [],
				tosee: [],
				toread: [],
				toeat: []
			},
			
			//Some real todos!
			realtodo : [
				{"type": "todo", "what": "Add tests", "complete": false},
				{"type": "todo", "what": "Add filter", "complete": false}
			],

            /**
             * Returns an array of toblahs of a specific type.
             * @param type
             * @private
             */
			_getFromLocalStorage: function (type) {
			    var a = [];
			    var map = localStorage.getItem(APP_CONSTANTS.storage.id);
                if (map) {
                    a = JSON.parse(localStorage.getItem(APP_CONSTANTS.storage.id))[type];
                }
				return a;
			},

            /**
             * Saves the passed in array of toBlahs against the type of the <b>first</b> elements's type
             * @param toblahArray - An array of toBlahs of a single type.
             * @private
             */
			_saveToLocalStorage:  function (toblahArray) {

				if (toblahArray && toblahArray.constructor === Array) {
					//If passed in value is an array

					//Get the first element
					var first = toblahArray[0];
					if (first != undefined) {
						var type = first.type;
						var existing = localStorage.getItem(APP_CONSTANTS.storage.id);
						if (!existing) {
							existing = this.toblahs;
						} else {
                            existing = JSON.parse(existing);
                        }
						existing[type] = toblahArray;
						localStorage.setItem(APP_CONSTANTS.storage.id, JSON.stringify(existing));
					} else {
						$log.warn('Empty array passed in to save!');
					}
				} else {
					$log.error('Passed in values were not an array!');
				}
			},

            /**
             * Clears the completd toblah of the specified type
             * @param type
             * @returns {deferred.promise|{then, catch, finally}}
             */
			clearCompleted: function (type) {
				var deferred = $q.defer();

				var incompleteToblahs = this.toblahs[type].filter(function (toblah) {
					return !toblah.complete;
				});

				angular.copy(incompleteToblahs, this.toblahs[type]);

				this._saveToLocalStorage(this.toblahs[type]);
				deferred.resolve(this.toblahs[type]);

				return deferred.promise;
			},

            /**
             * Deletes the specified toblah from local storage.
             * @param toblah
             * @returns {deferred.promise|{then, catch, finally}}
             */
			delete: function (toblah) {
				var deferred = $q.defer();

                // First find out the type of the passed in object.
                var type = toblah.type;

				this.toblahs[type].splice(this.toblahs[type].indexOf(toblah), 1);

				this._saveToLocalStorage(this.toblahs[type]);
				deferred.resolve(this.toblahs[type]);

				return deferred.promise;
			},

            /**
             * Returns the array of toblahs of the passed in type
             * @param type
             * @returns {deferred.promise|{then, catch, finally}}
             */
			get: function (type) {
				var deferred = $q.defer();

				angular.copy(this._getFromLocalStorage(type), this.toblahs[type]);
				deferred.resolve(this.toblahs[type]);

				return deferred.promise;
			},

            /**
             * Save a toblah of a certain type
             * @param toblah
             * @returns {deferred.promise|{then, catch, finally}} - The array of toblahs of the specified type
             */
			insert: function (toblah) {
				var deferred = $q.defer();

                // First find out the type of the passed in object.
                var type = toblah.type;

				this.toblahs[type].push(toblah);

				this._saveToLocalStorage(this.toblahs[type]);
				deferred.resolve(this.toblahs[type]);

				return deferred.promise;
			},

            /**
             * Update a toblah
             * @param toblah
             * @param index - the position where it needs to inserted
             * @returns {deferred.promise|{then, catch, finally}}
             */
			put: function (toblah, index) {
				var deferred = $q.defer();

                // First find out the type of the passed in object.
                var type = toblah.type;

				this.toblahs[type][index] = toblah;

				this._saveToLocalStorage(this.toblahs[type]);
				deferred.resolve(this.toblahs[type]);

				return deferred.promise;
			}
		};
});
