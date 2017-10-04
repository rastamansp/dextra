/**
 * @file Procurar e registrar rotas.
 * @since 2017-05-14
 * @author @douglaspands.
 */
'use strict';
// Modulos
/// Modulo com utilitarios.
const _ = require('lodash');
/// Modulo para concatenação de diretorios.
const path = require('path');
/// Modulo de tratamento de arquivos
const fs = require('fs');
/// Consulta configurações do sistema
const systemConfig = require('../config/config');
/// Consulta configurações do servidor
const serverConfig = require('../config/server');
/**
 * Construtor de registros de rotas.
 * @constructor
 * @param {object} server Servidor criado pelo framework Restify.
 * @param {object} context Objeto com variaveis de contexto da api.
 * @returns {object} Funções para tratamento de rotas.
 */
module.exports = (server, context) => {
    /**
     * @returns {function} callback do framework async.
     */
    return done => done(null, registrarRotas(server, context));
};
/**
 * Registrar rotas.
 * @private
 * @function registrarRotas
 * @param {object} server Servidor criado pelo framework Restify.
 * @param {object} contexto Objeto com variaveis de contexto da api.
 * @returns {collection} Coleção de rotas e metodos registrados.
 */
function registrarRotas(server, contexto) {
    // Modulo com funções de execução na chamada da rota
    let handlers = require('./routeHandlers')(contexto);
    return _
        .chain(fs.readdirSync(path.join(contexto.DIRETORIO_SERVER, systemConfig.dir.apis)))
        .reduce((lista, pasta) => {
            try {
                let apiConfig = require(path.join(contexto.DIRETORIO_SERVER, systemConfig.dir.apis, pasta, systemConfig.package));
                if (_.get(apiConfig, 'type') === systemConfig.type.api) {
                    let profiles = [];
                    if (_.get(apiConfig, 'profile', '')) {
                        if (!_.isArray(apiConfig.profile)) profiles.push(apiConfig.profile);
                        profiles = _.filter(profiles, profile => {
                            return _.includes(systemConfig.profiles, profile);
                        }, []);
                    }
                    lista.push({
                        route: _.get(apiConfig, 'route', ''),
                        method: _.get(apiConfig, 'method', ''),
                        controller: path.join(contexto.DIRETORIO_SERVER, systemConfig.dir.apis, pasta, _.get(apiConfig, systemConfig.default.controller, '')),
                        functions: _
                            .chain(systemConfig.handlers)
                            .filter(funcao => _.get(apiConfig, funcao.name, false) === true || funcao.required === true)
                            .map(funcao => funcao.name, [])
                            .value(),
                        profiles: profiles
                    });
                }
            } catch (e) { /* omitted */ }
            return lista;
        }, [])
        .filter(api => {
            return (_.isString(api.route) && _.size(api.route) > 0) &&
                (_.isString(api.method) && _.size(api.method) > 0 && _.includes(systemConfig.methods, (api.method).toLowerCase())) &&
                (_.isString(api.controller) && _.size(api.controller) && (new RegExp(systemConfig.regex.verify_controller, 'g')).test(api.controller)) &&
                (_.isArray(api.functions) && _.size(api.functions) > 1)
        })
        .reduce((lista, rota) => {
            let metodo = (rota.method).toString().toLowerCase();
            // Executa de-para de verbo x função do servidor (suporte restify/express)
            let metodoFuncao = _.get(systemConfig, (serverConfig.framework + '_methods.' + metodo), metodo);
            if (server[metodoFuncao]) {
                server[metodoFuncao]((rota.route).toString().toLowerCase(), handlers.get(rota, contexto));
                lista.push(rota);
            }
            return lista;
        }, [])
        .value();
};
