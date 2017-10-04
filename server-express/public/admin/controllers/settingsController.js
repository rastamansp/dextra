(function() {
    'use strict';

    angular
        .module('gwan')
        .controller('SettingsController', SettingsController);

    SettingsController.$inject = ['AccountService', 'logger', '$auth'];

    /* @ngInject */
    function SettingsController(AccountService, logger, $auth) {
        var vm = this;

        vm.title = 'SettingsController';
        vm.user = {};
        vm.addFacebookAccount = addFacebookAccount;
        vm.addInstaAccount = addInstaAccount;
        vm.updateUser = updateUser;
        vm.change = change;
        vm.canEdit = {
            name: true,
            email: true
        };


        activate();

        ////////////////

        function activate() {
            ///// seta usuário
            vm.user = AccountService.getUser();

            console.log(vm.user);
        }

        function addInstaAccount() {

            $auth.authenticate("instagram")
                .then(function(response) {
                    console.log("Adicionando nova conta");
                    console.log(response.data);
                    AccountService.setUser(response.data.user);
                    vm.user = AccountService.getUser();
                    logger.info('Adicionada nova conta com sucesso !');
                })
                .catch(function(error) {
                    if (error.error) {
                        // Popup error - invalid redirect_uri, pressed cancel button, etc.
                        logger.error(error.error);
                    } else if (error.data) {
                        // HTTP response error from server
                        logger.error(error.data.message, error.status);
                    } else {
                        logger.error(error);
                    }
                });
        };

        function addFacebookAccount() {

            $auth.authenticate("facebook")
                .then(function(response) {
                    console.log("Adicionando nova conta");
                    console.log(response.data);
                    AccountService.setUser(response.data.user);
                    vm.user = AccountService.getUser();
                    logger.info('Adicionada nova conta com sucesso !');
                })
                .catch(function(error) {
                    if (error.error) {
                        // Popup error - invalid redirect_uri, pressed cancel button, etc.
                        logger.error(error.error);
                    } else if (error.data) {
                        // HTTP response error from server
                        logger.error(error.data.message, error.status);
                    } else {
                        logger.error(error);
                    }
                });
        };

        function updateUser() {
            AccountService.updateUser(vm.user);
            logger.info('Usuario atualizado com sucesso!');
        }

        function change(field) {
            console.log(field);
            if (field === 'name') {
                console.log('name');
                vm.canEdit.name = !vm.canEdit.name;

            } else if (field === 'email') {
                console.log('email');
                vm.canEdit.email = !vm.canEdit.email;
            }
            console.log(vm.canEdit);
        }
    }
})();