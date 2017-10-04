(function() {
    'use strict';

    angular
        .module('gwan')
        .factory('logger', logger);

    logger.$inject = ['toastr', '$log'];

    /* @ngInject */
    function logger(toastr, $log) {
        var service = {
            showToastr: true,
            error: error,
            info: info,
            success: success,
            warning: warning,
            log: $log.log
        };

        return service;

        ////////////////

        function error(message, data, title) {
            toastr.error(message, title);
            $log.error('Error: ' + message, data);
        }

        function info(message, data, title) {
            toastr.info(message, title);
            $log.info('Info: ' + message, data);
        }

        function success(message, data, title) {
            toastr.success(message, title);
            $log.success('Success: ' + message, data);
        }

        function warning(message, data, title) {
            toastr.warning(message, title);
            $log.warning('Warning: ' + message, data);
        }
    }
})();