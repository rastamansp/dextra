(function() {
    'use strict';

    angular
        .module('gwan')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['AccountService', 'logger'];

    /* @ngInject */
    function HomeController(AccountService, logger) {
        var vm = this;

        // viewmodel
        vm.title = 'HomeController';
        vm.user = {};
        vm.currentTab = '';
        vm.feed = [];

        // methods

        activate();

        ////////////////

        function activate() {

            ///// busca usuario
            //vm.user = AccountService.getUser();

            ///// seta currentTab

        }


    }
})();