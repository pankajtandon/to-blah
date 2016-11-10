(function() {
    'use strict';

    /**
     * @ngdoc Application wide constants
     * @name APP_CONSTANTS
     * @description
     * # This constants service encapsulates application wide constants
     *
     * Main module of the ap
     */
    angular
        .module('toblah')
        .constant('APP_CONSTANTS', {

            storage: {
                id: 'toblah_storage_id'
            },
            type: {
                todo:    "todo",
                tobuy:   "tobuy",
                tolearn: "tolearn",
                tovisit: "tovisit",
                toread:  "toread",
                toeat:   "toeat",
                tosee:   "tosee"
            }
        });
})();