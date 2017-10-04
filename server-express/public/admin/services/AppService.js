(function() {
    'use strict';

    angular
        .module('gwan')
        .service('AppService', AppService);

    AppService.$inject = ['$localStorage', '$http', 'logger', '$state'];

    /* @ngInject */
    function AppService($localStorage, $http, logger, $state) {
        var Account = this;

        return {
            getFieldAlias: getFieldAlias,
            goToEditFest: goToEditFest
        };

        ////////////////

        ///// metodo que retorna apelido de campo
        function getFieldAlias(field) {
            ////// seta usuario em armazenamento local
            ///// verifica campo
            // 'type','timezone','owner','cover','genero'
            switch (field) {
                case "id":
                    return "id";
                case "can_guest_invite":
                    return "Consigo Convidar";
                case "guest_list_enabled":
                    return "lista de convidados";
                case "description":
                    return "descrição";
                case "start_time":
                    return "Horário de Início";
                case "end_time":
                    return "Horário de Início";
                case "interested_count":
                    return "Interessados";
                case "maybe_count":
                    return "Talvez";
                case "attending_count":
                    return "Confirmados";
                case "noreply_count":
                    return "Não Respondeu";
                case "declined_count":
                    return "Recusas";
                case "place":
                    return "Local";
                case "lastsystemupdate":
                    return "Última atualização do Sistema";
                case "name":
                    return "Nome";
                case "updated_time":
                    return "Horário de Atualização";
                case "type":
                    return "Tipo";
                case "timezone":
                    return "timezone";
                case "owner":
                    return "Responsável";
                case "cover":
                    return "Capa";
                case "about":
                    return "Sobre";
                case "bio":
                    return "Biografia";
                case "booking_agent":
                    return "Empresário";
                case "can_checkin":
                    return "Pode Confirmar presença";
                case "can_post":
                    return "Pode Postar";
                case "category":
                    return "Categoria";
                case "current_location":
                    return "Local";
                case "displayed_message_response_time":
                    return "Tempo de Resposta de mensagens";
                case "fan_count":
                    return "Curtidas";
                case "global_brand_page_name":
                    return "Marca";
                case "hometown":
                    return "Local de Origem";
                case "is_published":
                    return "Publicada";
                case "username":
                    return "Usuario";
                case "website":
                    return "Site";
                case "photos":
                    return "Fotos";
                case "events":
                    return "Eventos";
                case "likes":
                    return "Curtidas";
                default:
                    return field;
            }
        }

        function goToEditFest(partyID) {
            console.log('=========================');
            console.log('indo para:', '/editFesta/' + partyID);
            console.log('=========================');
            $state.go('root.editFesta', { partyID: partyID });
        }
    }
})();