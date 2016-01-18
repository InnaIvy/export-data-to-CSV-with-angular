(function () {
    'use strict';

    angular.module('rmDirExportService', [])
        .factory('exportService', ['$http', '$log', '$q', 'jwtHelper', function ($http, $log, $q, jwtHelper) {


            var exportService = {
                'getCsvData': getCsvData
            };

            function getCsvData(limit) {
                return $http.post( '',{
                    'rmd_module': 'EXPORT',
                    'rmd_action': 'export_to_csv',
                    'data': limit
                }).then(function (response) {

                        var tokenData = jwtHelper.decodeToken(response.data.tokenData);
                        if(angular.isObject(tokenData)){
                            return tokenData;
                        } else {
                            return $q.reject(tokenData);
                        }
                    },
                    function ( response ) {
                       $q.reject(response.data);
                    });


            }

            return exportService;

        }]);

})();
