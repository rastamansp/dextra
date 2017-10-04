(function() {
    'use strict';

    angular
        .module('gwan')
        .controller('MenuController', MenuController);

    MenuController.$inject = ['$scope', '$auth', 'toastr', 'AccountService'];

    /* @ngInject */
    function MenuController($scope, $auth, toastr, AccountService) {
        var vm = this;
        vm.title = 'MenuController';
        vm.user = {};

        activate();
        ////////////////

        function activate() {
            vm.user = AccountService.getUser();
        }
    }
})();