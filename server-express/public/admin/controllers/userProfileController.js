(function() {
    'use strict';

    angular
        .module('gwan')
        .controller('UserProfileController', UserProfileController);

    UserProfileController.$inject = ['AccountService', '$stateParams', 'logger'];

    /* @ngInject */
    function UserProfileController(AccountService, $stateParams, logger) {
        var vm = this;
        vm.title = 'UserProfileController';
        vm.user = {};
        vm.conta = {};
        vm.updateAccount = updateAccount;
        vm.setUserModal = setUserModal;
        vm.addUserToInspect = addUserToInspect;
        vm.addHashtagToInspect = addHashtagToInspect;
        vm.editUserToInspect = editUserToInspect;
        vm.removeUserToInspect = removeUserToInspect;
        vm.removeHashtagToInspect = removeHashtagToInspect;
        vm.userModal = {};

        activate();

        ////////////////

        function activate() {
            ///// busca usuario
            vm.user = AccountService.getUser();

            ///// busca conta de usuario
            vm.conta = AccountService.getUserAccount($stateParams.userID);
        }

        function updateAccount() {
            AccountService.updateUser(vm.user);

            logger.info('Usuario atualizado com sucesso!', 'teste');
        };

        function updateUser(user) {
            ///// atualiza usuario
            AccountService.setUser(user);

            ///// atualiza usuario na ViewModel
            vm.user = AccountService.getUser(user);

            ///// busca conta de usuario
            vm.conta = AccountService.getUserAccount($stateParams.userID);
        }

        ///// metodo que seta conteudo de conta em modal
        function setUserModal(conta) {
            vm.userModal = conta;
            console.log(conta);
            ///// busca dados da conta
            getInstaAccount(conta);
        }

        ///// metodo que busca/atualiza dados de conta de instagram
        function getInstaAccount(conta) {
            AccountService.getInstaAccount(conta.username)
                .then(function(response) {
                    ///// atualiza modal
                    vm.userModal = response;
                    /////  seta _id
                    vm.userModal._id = conta._id;
                    vm.userModal.followFollowers = conta.followFollowers;
                    vm.userModal.likeFollowers = conta.likeFollowers;
                }).catch(function(response) {
                    logger.error(response);
                });
        }

        ///// metodo que adiciona usuario a inspecionar
        function addUserToInspect(instaUser) {
            console.log('addUserToInspect');
            console.log(vm.user);
            AccountService.addUserToInspect(vm.user._id, vm.conta._id, instaUser)
                .then(function(response) {
                    ///// atualiza usuario
                    updateUser(response);
                    vm.userToInspect = "";
                    logger.info('Adicionado usuario instagram com sucesso!');
                }).catch(function(response) {

                    logger.error(response);
                });
        }

        ///// metodo que adiciona hashtag ara inspeção
        function addHashtagToInspect(tag) {
            console.log('addHashtagToInspect');
            console.log(vm.tag);
            AccountService.addHashtagToInspect(vm.user._id, vm.conta._id, tag)
                .then(function(response) {
                    ///// atualiza usuario
                    updateUser(response);
                    vm.tag = "";
                    logger.info('Adicionado hashtag sucesso!');
                }).catch(function(response) {
                    logger.error(response);
                });
        }

        ///// metodo que edita usuario a inspecionar
        function editUserToInspect(instaUser) {
            AccountService.editUserToInspect(vm.user._id, vm.conta._id, vm.userModal)
                .then(function(response) {
                    ///// atualiza usuario
                    //updateUser(response);
                    logger.info('Configurações de usuario instagram alteradas com sucesso!');
                    console.log(response);
                }).catch(function(response) {

                    logger.error(response);
                });
        }


        ///// metodo que remove usuario a inspecionar
        function removeUserToInspect(instaUser) {
            AccountService.removeUserToInspect(vm.user._id, vm.conta._id, instaUser._id)
                .then(function(response) {
                    ///// atualiza usuario
                    updateUser(response);
                    logger.info('Removido inspeção de usuario instagram com sucesso!');

                }).catch(function(response) {

                    console.log(response);
                });
        }

        ///// metodo que adiciona usuario a quem curtiu
        function removeHashtagToInspect(tag) {
            AccountService.removeHashtagToInspect(vm.user._id, vm.conta._id, tag)
                .then(function(response) {
                    ///// atualiza usuario
                    updateUser(response);
                    logger.info('Removida tag[' + tag + '] com sucesso!');

                }).catch(function(response) {
                    console.log(response);
                });
        }

    }
})();