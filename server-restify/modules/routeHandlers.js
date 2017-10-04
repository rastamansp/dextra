/**
 * @file Cria lista de execuções que a rota precisa executar.
 * @since 2017-06-17
 * @author @douglaspands.
 */
'use strict';
// Modulo de apoio ao ECMAScript.
const _ = require('lodash');
// Configurações do sistema
const systemConfig = require('../config/config');
// Configurações do servidor
const serverConfig = require('../config/server');
/**
 * Obter coleção de funções para execução da rota.
 * @constructor
 * @param {object} context Objeto com variaveis de contexto da api.
 */
module.exports = function(context) {
    return {
        /**
         * @function get
         * @param {object} route Parametros da rota.
         * @return {collection} Coleção de funções para execução da rota.
         */
        get: route => listaExecucoes(route, context)
    };
}
/**
 * Sequencia de funções que serão executados na chamada da rota.
 * Funções: JSW, GraphQL e Controller são permitidas 
 * @private 
 * @function listaExecucoes
 * @param {object} rota Parametros para execução da rota.
 * @param {object} context Objeto com variaveis de contexto da api.
 * @returns {collection} Coleção de funções para execução da rota.
 */
function listaExecucoes(rota, context) {
    // Metodos
    const metodos = {
        /**
         * Função de autorização da api.
         * @function auth
         * @constructor
         * @param {object} context Objeto com variaveis de contexto da api.
         */
        auth: (context, rota) => {
            /**
             * @param {object} req Objeto com parametros, query e body recebidos pela request http.
             * @param {object} res Objeto com funções de response http.
             * @param {object} next Objeto com a função de liberar a proxima execução.
             */
            return (req, res, next) => {
                if (_.get(req.headers, 'x-access-token', '')) {
                    let rotaConfig = rota;
                    context.verifyToken(req.headers['x-access-token'], (erro, resultado) => {
                        if (erro) {
                            return res.send(401, context.message('401', {
                                module: systemConfig.default.value
                            }));
                        } else if (_.size(rotaConfig.profiles) > 0) {
                            let profileValid = _.filter(_.get(resultado, 'profile'), (profile) => {
                                return _.includes(rotaConfig.profiles, profile);
                            }, [])
                            if (_.size(profileValid) < 1) {
                                return res.send(401, context.message('401', {
                                    module: systemConfig.default.value
                                }));
                            } else {
                                return next();
                            }
                        } else {
                            return next();
                        }
                    });
                } else {
                    return res.send(401, context.message('401', {
                        module: systemConfig.default.value
                    }));
                }
            }
        },
        /**
         * Função para de validação da api na inicialização.
         * Valida informações passadas no header da api e prepara para execução da controller e demais funções.
         * @function start
         * @constructor
         * @param {object} context Objeto com variaveis de contexto da api.
         */
        start: context => {
            /**
             * @param {object} req Objeto com parametros, query e body recebidos pela request http.
             * @param {object} res Objeto com funções de response http.
             * @param {object} next Objeto com a função de liberar a proxima execução.
             */
            return (req, res, next) => {
                // Definindo idioma de acordo com o que o solicitante da request passou
                context.IDIOMA = (_.includes(systemConfig.headers.accept_language, _.get(req.headers,
                        'accept-language', ''))) ?
                    req.headers['accept-language'] :
                    systemConfig.default.lang;
                // Definindo o diretorio da api
                context.DIRETORIO_API = (rota.controller).toString().replace((new RegExp(systemConfig.regex
                    .remove_controller, 'g')), '');
                // Executando validações
                switch (true) {
                    // Verificando se Content-type é permitido na aplicação.
                    case (_.get(req.headers, 'content-type', '') && !(_.includes(systemConfig.headers.content_type,
                        req.headers['content-type']))):
                        return res.send(415, context.message('415', {
                            module: systemConfig.default.value
                        }));
                    default:
                        return next();
                }
            };
        },
        /**
         * Função de controller da api.
         * @function controller
         * @constructor
         * @param {object} context Objeto com variaveis de contexto da api.
         */
        controller: context => {
            /**
             * @param {object} req Objeto com parametros, query e body recebidos pela request http.
             * @param {object} res Objeto com funções de response http.
             * @param {object} next Objeto com a função de liberar a proxima execução.
             */
            return (req, res, next) => {
                let error = undefined;
                let first_function = (_.get(rota, 'first_function', '')) ?
                    rota.first_function :
                    systemConfig.default.controller;
                try {
                    require(rota.controller)[first_function](req, res, context);
                } catch (err) {
                    console.log(err);
                    error = err;
                }
                return next(error);
            };
        },
        /**
         * Função pós execução da api.
         * @function end
         * @constructor
         * @param {object} context Objeto com variaveis de contexto da api.
         */
        end: context => {
            /**
             * @param {object} req Objeto com parametros, query e body recebidos pela request http.
             * @param {object} res Objeto com funções de response http.
             * @param {object} next Objeto com a função de liberar a proxima execução.
             * @param {object} error Objeto com parametros de erro, caso a execução da controller tem dado erro.
             */
            return (req, res, next, error) => {
                // Definindo idioma de acordo com o que o solicitante da request passou
                return next();
            };
        },

    };
    // Retornando lista de execuções.
    return _.reduce(rota.functions, (lista, funcao) => {
        if (metodos[funcao]) lista.push(metodos[funcao](context, rota));
        return lista;
    }, []);
};
