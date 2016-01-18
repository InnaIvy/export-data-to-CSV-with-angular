(function () {
    'use strict';


    angular
        .module('rmDirExportController', [])



        /*** Listing controller.
         *
         * @param {!angular.Scope} $scope
         * @param {service} listSrvc
         * @constructor
         * @ngInject
         * @export
         */
        .controller('exportController', exportController);

    exportController.$inject = ['$scope', 'exportService', 'feedback', '$log'];


    function exportController($scope, exportService,  feedback, $log) {

        var vm = this;

        vm.status = {
            isopen: false
        };

        vm.date = new Date();
        $scope.filename = vm.date + "_dir_export.csv";


        vm.limit = 0;
        vm.disabled = true;
        vm.CSV = {};


        /**
         * Update count rows of breeders for export
         * @param limit
         */

        vm.updateLimit = function (limit) {
            vm.limit = limit;

            /**
             * Call method for generate CSV data with limit
             */

            vm.getCsvData(vm.limit);
            vm.disabled = false;

        };


        /**
         * Get Generated CSV file from Data Base
         */
        vm.getCsvData = function (limit) {
            exportService.getCsvData(limit)
                .then(function (data) {
                    vm.CSV.getHeads = data.heads;
                    vm.CSV.getDataArray = JSON.parse(data.result);
                    return vm.CSV;
                });
        };

    }

})();