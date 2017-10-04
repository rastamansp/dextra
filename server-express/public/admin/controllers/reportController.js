(function() {
    'use strict';

    angular
        .module('gwan')
        .controller('ReportController', ReportController);

    ReportController.$inject = ['AccountService', 'logger'];

    /* @ngInject */
    function ReportController(AccountService, logger) {
        var vm = this;
        vm.title = 'ReportController';
        vm.user = {};
        vm.accounts = [];
        vm.conta = {};
        vm.modalTitle = "";
        vm.usersModal = [];
        vm.showAccount = showAccount;
        vm.getLastHour = getLastHour;
        vm.setUsersModal = setUsersModal;
        vm.canFollow = canFollow;
        vm.follow = follow;


        activate();

        ////////////////

        function activate() {
            console.log(vm.title);

            ///// busca usuario
            vm.user = AccountService.getUser();

            if (!vm.user.accounts) {
                //// busca contas
                for (var i = 0; i < vm.user.instaUsers.length; i++) {
                    getInstaAccount(vm.user.instaUsers[i].instaID, vm.user.instaUsers[i].token);
                }
                vm.user.accounts = vm.accounts;

                AccountService.setUser(vm.user);
                console.log("buscou");
            } else {
                console.log("não buscou");
                vm.accounts = vm.user.accounts;
            }
        }

        ///// metodo que seta conteudo de lista de contas em modal
        function setUsersModal(contas, type) {
            vm.usersModal = contas;


            if (type === "new") {
                //// Novos seguidores
                vm.modalTitle = "Novos Seguidores de @" + vm.conta.username;

            } else if (type === "lost") {
                //// Seguidores perdidos
                vm.modalTitle = "Seguidores perdidos de @" + vm.conta.username;
            } else if (type === "fans") {
                //// Fans
                vm.modalTitle = "Fans de @" + vm.conta.username;
            } else if (type === "notSDV") {
                //// Não seguem de volta
                vm.modalTitle = "Parfis que não seguem devolta @" + vm.conta.username;
            }
        }

        ///// metodo que busca/atualiza dados de conta de instagram
        function getInstaAccount(conta, token) {
            AccountService.getAccountDetails(conta, token)
                .then(function(response) {
                    if (response.success) {
                        vm.accounts.push(response.user);
                    }
                }).catch(function(response) {
                    logger.error(response);
                });
        }

        ///// metodo que busca/atualiza dados de conta de instagram
        function follow(conta) {
            console.log(vm.conta);
            AccountService.userInteract(conta.id, 'follow', vm.conta.token)
                .then(function(response) {
                    if (response) {
                        console.log(response);
                    }
                }).catch(function(response) {
                    logger.error(response);
                });
        }

        ///// metodo que seta dados de relatorio
        function showAccount(conta) {
            vm.conta = conta;
        }

        ///// metodo que retorna caso usuario possa seguir conta
        function canFollow(conta) {
            var canFollow = true;

            ///// itera seguidores
            vm.conta.followers.forEach(function(element) {
                ///// caso encontre conta em lista de seguidores
                if (conta.username === element.username) {
                    console.log("Usuario " + vm.conta + " ja segue @" + element.username);
                    ///// não permite que usuario siga usuario já seguido
                    canFollow = false;
                }
            });

            return canFollow;
        }

        ///// metodo que retorna XX days/hours/minutes ago
        function getLastHour(userList) {
            var ultimo;
            if (userList) {
                if (userList.length > 0) {
                    ultimo = userList[userList.length - 1];
                    return ultimo.new;
                }
            } else {
                return ultimo;
            }
            return undefined;
        }

        function getToken(conta, username) {

        }
    }
})();