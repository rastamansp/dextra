(function() {
    'use strict';

    angular
        .module('gwan')
        .service('AccountService', AccountService);

    AccountService.$inject = ['$localStorage', '$http', 'logger'];

    /* @ngInject */
    function AccountService($localStorage, $http, logger) {
        var Account = this;

        return {
            setUser: setUser,
            getUser: getUser,
            updateUser: updateUser,

            getUserAccount: getUserAccount,
            getInstaAccount: getInstaAccount,
            addUserToInspect: addUserToInspect,
            editUserToInspect: editUserToInspect,
            addHashtagToInspect: addHashtagToInspect,
            removeHashtagToInspect: removeHashtagToInspect,
            removeUserToInspect: removeUserToInspect,


            getGeneros: getGeneros,
            updateGenero: updateGenero,
            insertGenero: insertGenero,

            getNames: getNames,
            updateName: updateName,
            insertName: insertName,

            getFeed: getFeed,
            getAccountDetails: getAccountDetails,
            userInteract: userInteract,
            getPage: getPage,
            updatePage: updatePage,
            updatePageDetails: updatePageDetails,
            getPages: getPages,
            inspectPage: inspectPage,

            getFilteredEvents: getFilteredEvents,
            getEvents: getEvents,
            getEvent: getEvent,
            insertEvent: insertEvent,
            updateEvent: updateEvent,
            updateEventDetails: updateEventDetails,
            getPeoplesEvent: getPeoplesEvent,

            getPeople: getPeopleByName,
            updatePeople: updatePeople,
            getPeopleByID: getPeopleByID,
            getPeopleEvents: getPeopleEvents,
            getConfigChanges: getConfigChanges,
            getConfigs: getConfigs,
            editConfig: editConfig,
            newConfig: newConfig,
            editConfigChange: editConfigChange,
            newConfigChange: newConfigChange,
            getMatch: getMatch,
            newCrush: newCrush,

            createFesta: createFesta,
            getFesta: getFesta,
            getFestas: getFestas,
            updateFesta: updateFesta

        };

        ////////////////

        ///// metodo que seta usuario em storage
        function setUser(_user) {
            ////// seta usuario em armazenamento local
            $localStorage.user = _user;
        }

        ///// metodo que busca usuario em storage
        function getUser() {
            ////// busca usuario em armazenamento local
            return $localStorage.user;
        }

        ///// metodo que atualiza dados de um usuario
        function updateUser(user) {
            const url = '/api/users/' + user._id;

            ////// retorna chamada a API
            return $http.put(url, user)

            ///// resposta OK
            .then(updateUserComplete)

            ///// caso erro
            .catch(updateUserFailed);

            function updateUserComplete(response) {
                return response.data;
            }

            function updateUserFailed(error) {
                logger.error('XHR Failed for updateUser.' + error.data);
            }
        }

        ///// metodo que realiza chamada a API de criação nova configuração
        function createFesta(festa) {
            console.log('createFesta', festa);
            const url = '/api/festas/Criar';

            ////// retorna chamada a API
            return $http.post(url, festa)

            ///// resposta OK
            .then(methodComplete)

            ///// caso erro
            .catch(methodFailed);
        }


        ////// metodo que realiza chamada a API de busca a Conta do instagram
        function getFesta(partyID) {
            const url = '/api/festas/' + partyID;
            console.log("URL:", url);

            ////// retorna chamada a API
            return $http.get(url)

            ///// resposta OK
            .then(methodComplete)

            ///// caso erro
            .catch(methodFailed);
        }

        ////// metodo que realiza chamada a API de busca a Conta do instagram
        function getFestas() {
            const url = '/api/festas/';
            console.log("URL:", url);

            ////// retorna chamada a API
            return $http.get(url)

            ///// resposta OK
            .then(methodComplete)

            ///// caso erro
            .catch(methodFailed);
        }

        ///// metodo que realiza chamada para atualizacao de Festa 
        function updateFesta(festaID, festaJSON) {
            const url = '/api/festas/' + festaID;
            console.log("URL:", url);
            console.log("json:", festaJSON);

            ////// retorna chamada a API
            return $http.put(url, festaJSON)

            ///// resposta OK
            .then(methodComplete)

            ///// caso erro
            .catch(methodFailed);
        }

        ///// metodo que busca conta do instagram cadastrada no usuario
        function getUserAccount(accountID) {
            var retval;

            ///// itera usuarios encontrados
            $localStorage.user.instaUsers.forEach(function(element) {

                //// verifica se é conta encontrada
                if (element.username === accountID) {

                    retval = element;
                } else {

                    console.log(element.username === accountID);
                    return element;
                }
            });

            return retval;
        }

        ////// metodo que realiza chamada a API de busca a Conta do instagram
        function getInstaAccount(instaID) {
            const url = '/api/accounts/user/' + instaID;
            console.log("URL:", url);

            ////// retorna chamada a API
            return $http.get(url)

            ///// resposta OK
            .then(methodComplete)

            ///// caso erro
            .catch(methodFailed);
        }

        ////// metodo que realiza chamada a API de busca a Conta do instagram
        function getAccountDetails(instaID, token) {
            const url = '/api/accounts/user/' + instaID + "?token=" + token;
            console.log("URL:", url);

            ////// retorna chamada a API
            return $http.get(url)

            ///// resposta OK
            .then(methodComplete)

            ///// caso erro
            .catch(methodFailed);
        }

        function getFeed(instaID) {
            const url = '/api/instagram/feed?id=' + instaID;
            console.log("URL:", url);

            return $http.get(url)
                ///// resposta OK
                .then(methodComplete)

            ///// caso erro
            .catch(methodFailed);
        }

        function getNames() {
            const url = '/api/names/';
            console.log("URL:", url);

            return $http.get(url)
                ///// resposta OK
                .then(methodComplete)

            ///// caso erro
            .catch(methodFailed);
        }

        ///// metodo que realiza chamada a API de busca a Conta do instagram
        function updateName(nameID, nameJSON) {
            const url = '/api/names/' + nameID;
            console.log("URL:", url);
            console.log("json:", nameJSON);

            ////// retorna chamada a API
            return $http.put(url, nameJSON)

            ///// resposta OK
            .then(methodComplete)

            ///// caso erro
            .catch(methodFailed);
        }

        ///// metodo que realiza chamada a API de busca a Conta do instagram
        function updateNames(nameID, nameJSON) {
            const url = '/api/names/' + nameID;
            console.log("URL:", url);
            console.log("json:", nameJSON);

            ////// retorna chamada a API
            return $http.put(url, nameJSON)

            ///// resposta OK
            .then(methodComplete)

            ///// caso erro
            .catch(methodFailed);
        }

        ///// metodo que realiza chamada a API de busca a Conta do instagram
        function insertName(nameID, nameJSON) {
            const url = '/api/names/';
            console.log("URL:", url);
            console.log("json:", nameJSON);

            ////// retorna chamada a API
            return $http.post(url, nameJSON)

            ///// resposta OK
            .then(methodComplete)

            ///// caso erro
            .catch(methodFailed);
        }

        ///// metodo que realiza chamada a API de busca a Conta do instagram
        function addUserToInspect(userID, instaID, user) {
            const url = '/api/users/user/' + userID + '/' + instaID + '/addUsersToInspect';

            ////// retorna chamada a API
            return $http.put(url, { "username": user })

            ///// resposta OK
            .then(methodComplete)

            ///// caso erro
            .catch(methodFailed);
        }

        ///// metodo que realiza chamada a API de edição de usuario à inspecionar
        function editUserToInspect(userID, instaID, user) {
            console.log('editUserToInspect', user);
            const url = '/api/users/user/' + userID + '/' + instaID + '/' + user._id + '/editUserToInspect';

            ////// retorna chamada a API
            return $http.put(url, user)

            ///// resposta OK
            .then(methodComplete)

            ///// caso erro
            .catch(methodFailed);
        }

        ///// metodo que realiza chamada a API de remover a Conta do instagram
        function removeUserToInspect(userID, instaID, idUser) {
            const url = '/api/users/user/' + userID + '/' + instaID + '/' + idUser + '/removeUserToInspect';

            ////// retorna chamada a API
            return $http.delete(url)

            ///// resposta OK
            .then(methodComplete)

            ///// caso erro
            .catch(methodFailed);
        }


        ///// metodo que realiza chamada a API adicionando nova hashtag a lista de tags inspecionadas
        function addHashtagToInspect(userID, instaID, tag) {
            const url = '/api/users/user/' + userID + '/' + instaID + '/addHashtagToInspect';
            console.log("tag", tag);
            ////// retorna chamada a API
            return $http.put(url, { tag: tag })

            ///// resposta OK
            .then(methodComplete)

            ///// caso erro
            .catch(methodFailed);

        }

        ///// metodo que realiza chamada a API de remover a Conta do instagram
        function removeHashtagToInspect(userID, instaID, idTag) {
            const url = '/api/users/user/' + userID + '/' + instaID + '/' + idTag + '/removeHashTagToInspect';
            console.log("tag", idTag);
            ////// retorna chamada a API
            return $http.delete(url)

            ///// resposta OK
            .then(methodComplete)

            ///// caso erro
            .catch(methodFailed);

        }

        ///// metodo que realiza chamada a API para alterar iteração de usuario
        function userInteract(instaID, interactType, token) {
            const url = '/api/accounts/interact';

            console.log("userInteract", interactType);

            ////// retorna chamada a API
            return $http.put(url, {
                instaID: instaID,
                interactType: interactType,
                token: token
            })

            ///// resposta OK
            .then(methodComplete)

            ///// caso erro
            .catch(methodFailed);

        }

        ///// metodo que realiza chamada a API de criação novo evento
        function insertEvent(eventID, token) {
            const url = '/api/events/newEvent?eventID=' + eventID + "&token=" + token;
            console.log('insertEvent:', url);

            ////// retorna chamada a API
            return $http({
                method: 'GET',
                url: url,
                skipAuthorization: true // `Authorization: Bearer <token>` will not be sent on this request.
            })

            ///// resposta OK
            .then(methodComplete)
                ///// caso erro
                .catch(methodFailed);

        }

        function getEvents(eventID, limit) {
            const url = '/api/events/?limit=' + limit + "&eventID=" + eventID;
            console.log("URL:", url);

            return $http({
                    method: 'GET',
                    url: url,
                    skipAuthorization: true // `Authorization: Bearer <token>` will not be sent on this request.
                })
                ///// resposta OK
                .then(methodComplete)
                ///// caso erro
                .catch(methodFailed);
        }

        function getFilteredEvents(filters, limit) {
            console.log("getFilteredEvents");
            const params = (filters.length > 0 ? filters.join("&") : "");
            const url = '/api/events/Filter?' + params;
            console.log("URL:", url);

            return $http({
                    method: 'GET',
                    url: url,
                    skipAuthorization: true // `Authorization: Bearer <token>` will not be sent on this request.
                })
                ///// resposta OK
                .then(methodComplete)
                ///// caso erro
                .catch(methodFailed);
        }

        ///// metodo que atualiza dados de evento
        function updateEvent(eventID, eventJSON) {
            const url = '/api/events/' + eventID;
            console.log('PUT url', url);
            console.log('updateEvent', eventJSON);

            ////// retorna chamada a API
            return $http.put(url, eventJSON)

            ///// resposta OK
            .then(methodComplete)

            ///// caso erro
            .catch(methodFailed);
        }

        function updateEventDetails(eventID, token) {
            const params = "?eventID=" + eventID + "&token=" + token;
            const url = "/api/events/UpdateDetails/" + params;
            console.log("URL:", url);

            return $http({
                    method: 'GET',
                    url: url,
                    skipAuthorization: true // `Authorization: Bearer <token>` will not be sent on this request.
                })
                ///// resposta OK
                .then(methodComplete)
                ///// caso erro
                .catch(methodFailed);
        }

        function getEvent(eventID) {
            const url = '/api/events/' + eventID + "/Event";
            console.log("URL:", url);

            return $http({
                    method: 'GET',
                    url: url,
                    skipAuthorization: true // `Authorization: Bearer <token>` will not be sent on this request.
                })
                ///// resposta OK
                .then(methodComplete)
                ///// caso erro
                .catch(methodFailed);
        }

        function getConfigChanges() {
            const url = '/api/configsChanges/';
            console.log("URL:", url);

            return $http({
                    method: 'GET',
                    url: url,
                    skipAuthorization: true // `Authorization: Bearer <token>` will not be sent on this request.
                })
                ///// resposta OK
                .then(methodComplete)
                ///// caso erro
                .catch(methodFailed);
        }

        function getConfigs() {
            const url = '/api/configs/';
            console.log("URL:", url);

            return $http({
                    method: 'GET',
                    url: url,
                    skipAuthorization: true // `Authorization: Bearer <token>` will not be sent on this request.
                })
                ///// resposta OK
                .then(methodComplete)
                ///// caso erro
                .catch(methodFailed);
        }

        ///// metodo que realiza chamada a API de edição de configuração
        function editConfig(config) {
            console.log('editConfig', config);
            const url = '/api/configs/' + config._id;

            ////// retorna chamada a API
            return $http.put(url, config)

            ///// resposta OK
            .then(methodComplete)

            ///// caso erro
            .catch(methodFailed);
        }

        ///// metodo que realiza chamada a API de edição de configuração
        function editConfigChange(config) {
            console.log('editConfig', config);
            const url = '/api/configsChanges/' + config._id;

            ////// retorna chamada a API
            return $http.put(url, config)

            ///// resposta OK
            .then(methodComplete)

            ///// caso erro
            .catch(methodFailed);
        }

        ///// metodo que realiza chamada a API de criação nova configuração
        function newConfigChange(config) {
            console.log('newConfig', config);
            const url = '/api/configsChanges/';

            ////// retorna chamada a API
            return $http.post(url, config)

            ///// resposta OK
            .then(methodComplete)

            ///// caso erro
            .catch(methodFailed);
        }

        ///// metodo que realiza chamada a API de criação nova configuração
        function newConfig(config) {
            console.log('newConfig', config);
            const url = '/api/configs/';

            ////// retorna chamada a API
            return $http.post(url, config)

            ///// resposta OK
            .then(methodComplete)

            ///// caso erro
            .catch(methodFailed);
        }



        function getPages() {
            const url = '/api/pages/';
            console.log("URL:", url);

            return $http({
                    method: 'GET',
                    url: url,
                    skipAuthorization: true // `Authorization: Bearer <token>` will not be sent on this request.
                })
                ///// resposta OK
                .then(methodComplete)
                ///// caso erro
                .catch(methodFailed);
        }

        function updatePageDetails(pageID, token) {
            const params = "pageID=" + pageID + "&token=" + token;
            const url = '/api/pages/Update?' + params;
            console.log("URL:", url);

            return $http({
                    method: 'GET',
                    url: url,
                    skipAuthorization: true // `Authorization: Bearer <token>` will not be sent on this request.
                })
                ///// resposta OK
                .then(methodComplete)
                ///// caso erro
                .catch(methodFailed);
        }


        ///// metodo que atualiza dados de uma pagina
        function updatePage(pageID, pageJSON) {
            console.log('updatePage', pageJSON);
            const url = '/api/pages/' + pageID;

            ////// retorna chamada a API
            return $http.put(url, pageJSON)

            ///// resposta OK
            .then(methodComplete)

            ///// caso erro
            .catch(methodFailed);
        }

        function inspectPage(page) {
            const params = "?token=" + page.token + "&pageID=" + page.pageID;
            const url = '/api/pages/Inspecionar' + params;
            console.log("URL:", url);

            return $http({
                    method: 'GET',
                    url: url,
                    skipAuthorization: true // `Authorization: Bearer <token>` will not be sent on this request.
                })
                ///// resposta OK
                .then(methodComplete)
                ///// caso erro
                .catch(methodFailed);
        }

        ///// metodo que realiza chamada a API de busca a Conta do instagram
        function insertGenero(generoJSON) {
            const url = '/api/generos/';
            console.log("URL:", url);
            console.log("json:", generoJSON);

            ////// retorna chamada a API
            return $http.post(url, generoJSON)

            ///// resposta OK
            .then(methodComplete)

            ///// caso erro
            .catch(methodFailed);
        }

        function getGeneros() {
            const url = '/api/generos/';
            console.log("URL:", url);

            return $http({
                    method: 'GET',
                    url: url,
                    skipAuthorization: true // `Authorization: Bearer <token>` will not be sent on this request.
                })
                ///// resposta OK
                .then(methodComplete)
                ///// caso erro
                .catch(methodFailed);
        }

        ///// metodo que atualiza dados de um genero
        function updateGenero(generoID, generoJSON) {
            console.log('updateGenero', generoJSON);
            const url = '/api/generos/' + generoID;

            ////// retorna chamada a API
            return $http.put(url, generoJSON)

            ///// resposta OK
            .then(methodComplete)

            ///// caso erro
            .catch(methodFailed);
        }


        function getPage(pageID) {
            const url = '/api/pages/' + pageID;
            console.log("URL:", url);

            return $http({
                    method: 'GET',
                    url: url,
                    skipAuthorization: true // `Authorization: Bearer <token>` will not be sent on this request.
                })
                ///// resposta OK
                .then(methodComplete)
                ///// caso erro
                .catch(methodFailed);
        }

        function getPeopleByName(name) {
            const url = '/api/people/' + name + '/ByName';
            console.log("URL:", url);

            return $http({
                    method: 'GET',
                    url: url,
                    skipAuthorization: true // `Authorization: Bearer <token>` will not be sent on this request.
                })
                ///// resposta OK
                .then(methodComplete)
                ///// caso erro
                .catch(methodFailed);
        }

        ///// metodo que atualiza dados de pessoa
        function updatePeople(peopleID, peopleJSON) {
            console.log('updatePeople', peopleJSON);
            const url = '/api/people/' + peopleID;

            ////// retorna chamada a API
            return $http.put(url, peopleJSON)

            ///// resposta OK
            .then(methodComplete)

            ///// caso erro
            .catch(methodFailed);
        }

        function getPeoplesEvent(name) {
            const url = '/api/events/' + name + '/Events';
            console.log("URL:", url);

            return $http({
                    method: 'GET',
                    url: url,
                    skipAuthorization: true // `Authorization: Bearer <token>` will not be sent on this request.
                })
                ///// resposta OK
                .then(methodComplete)
                ///// caso erro
                .catch(methodFailed);
        }



        function getPeopleByID(id) {
            const url = '/api/people/' + id;
            console.log("URL:", url);

            return $http({
                    method: 'GET',
                    url: url,
                    skipAuthorization: true // `Authorization: Bearer <token>` will not be sent on this request.
                })
                ///// resposta OK
                .then(methodComplete)
                ///// caso erro
                .catch(methodFailed);
        }

        function getPeopleEvents(id) {
            const url = '/api/people/' + id + "/Events";
            console.log("URL:", url);

            return $http({
                    method: 'GET',
                    url: url,
                    skipAuthorization: true // `Authorization: Bearer <token>` will not be sent on this request.
                })
                ///// resposta OK
                .then(methodComplete)
                ///// caso erro
                .catch(methodFailed);
        }

        function getMatch(id) {
            const url = '/api/facebook/' + id + "/listPeoples";
            console.log("URL:", url);

            return $http({
                    method: 'GET',
                    url: url,
                    skipAuthorization: true // `Authorization: Bearer <token>` will not be sent on this request.
                })
                ///// resposta OK
                .then(methodComplete)
                ///// caso erro
                .catch(methodFailed);
        }

        function newCrush(idPeople, idEvent, idUser) {
            const url = '/api/facebook/' + id + "/listPeoples";
            console.log("URL:", url);

            return $http({
                    method: 'GET',
                    url: url,
                    skipAuthorization: true // `Authorization: Bearer <token>` will not be sent on this request.
                })
                ///// resposta OK
                .then(methodComplete)
                ///// caso erro
                .catch(methodFailed);
        }

        function methodFailed(error) {
            logger.error('XHR Failed .' + error.data);
        }

        function methodComplete(response) {
            return response.data;
        }
    }
})();