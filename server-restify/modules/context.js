/**
 * @file Objeto de contexto das rotas.
 * @since 2017-05-14
 * @author @douglaspands.
 */
'use strict';
// Modulo com utilitarios do ECMAScript
const _ = require('lodash');
// Modulo com utilitarios para montagem de path de diretorios
const path = require('path');
// Modulo de autenticação jwt
const jwt = require('jsonwebtoken');
/**
 * Construtor de registros de rotas.
 * @constructor
 * @param {object} options Objeto com configurações extras.
 * @returns {object} Funções de contexto para as rotas/apis.
 */
module.exports = options => {
    // Metodos disponiveis
    let metodos = {};
    // Obter configurações do sistema.
    const systemPackage = require('../package');
    // Obter configurações do sistema.
    const systemConfig = require('../config/config');
    // Obter configurações do banco e dados.
    const serverConfig = require('../config/server');
    // Obter configurações do banco e dados.
    const dbConfig = require('../config/db');
    // Obter mensagens do sistema.
    const systemMessages = require('../config/messages');
    // Chaves e senhas
    const keys = require('../config/keys');
    // Diretorio raiz
    const dirServer = (_.isString(_.get(options, 'serverDir', null))) ?
        path.join(__dirname, options.serverDir) :
        __dirname.replace((new RegExp(systemConfig.regex.remove_modules, 'g')), '');
    /**
     * Nome do database das tabelas
     * @returns {string} Nome do database das tabelas.
     */
    metodos.API_SERVER = serverConfig.framework;
    /**
     * Nome do database das tabelas
     * @returns {string} Nome do database das tabelas.
     */
    metodos.DATABASE_NAME = dbConfig[0].database;
    /**
     * Nome do servidor
     * @returns {string} Nome servidor.
     */
    metodos.SERVER_NAME = systemPackage.name;
    /**
     * Versão do servidor
     * @returns {string} Versão do servidor.
     */
    metodos.SERVER_VERSION = systemPackage.version;
    /**
     * URL de execução do servidor
     * @returns {string} Numero da porta que esta executando o servidor.
     */
    metodos.URL = serverConfig.url || 'localhost';
    /**
     * Porta de execução do servidor
     * @returns {string} Numero da porta que esta executando o servidor.
     */
    metodos.PORT = serverConfig.port || '8080';
    /**
     * Lista de rotas registradas
     * @returns {array} Lista de rotas.
     */
    metodos.ROTAS = [];
    /**
     * Url do servidor MongoDB
     * @returns {string} Retornar url do MongoDB.
     */
    metodos.MONGODB_URL = dbConfig[0].urls[0].url;
    /**
     * Conexão com o mongodb atarves do drive nativo
     * @returns {object} Retornar o objeto de conexão com banco.
     */
    metodos.mongodb = undefined;
    /**
     * Conexão com o mongodb atraves do Mongoose
     * @returns {object} Retornar o objeto de conexão com banco.
     */
    metodos.mongoose = undefined;
    /**
     * Diretorio do servidor
     * @returns {string} Retornar o nome do diretorio do servidor.
     */
    metodos.DIRETORIO_SERVER = dirServer;
    /**
     * Diretorio da api atual
     * @returns {string} Retornar o nome do diretorio do servidor.
     */
    metodos.DIRETORIO_API = undefined;
    /**
     * Idioma parametrizado.
     * @returns {string} Retornar o idioma passado no header da api.
     */
    metodos.IDIOMA = undefined;
    /**
     * Criptografar senha.
     * @public
     * @function criptografarSenha
     * @param {string} senha Senha que sera criptografada.
     * @returns {string} Senha (hash) criptografada.
     */
    metodos.criptografarSenha = senha => {
        if (_.isString(senha)) {
            // Retornar hash criptografia
            return require('crypto').createHmac('sha256', senha)
                .update(require('../config/keys').crypto.update)
                .digest('hex');
        } else {
            return '';
        }
    };
    /**
     * Trata retorno das execuções de banco de dados e rotas.
     * @public
     * @function preparacao
     * @param {object} resultados Resultados das execuções de parametrização.
     * @returns {void}
     */
    metodos.preparacao = resultados => {
        metodos.ROTAS = _.get(resultados, 'rotas', 0);
        metodos.mongodb = _.get(resultados, 'mongodb_native.db', undefined);
        metodos.mongoose = _.get(resultados, 'mongoose.db', undefined);
    };
    /**
     * Chamar modulo.
     * @private
     * @function obterModulo
     * @param {string} modulo - Nome do modulo.
     * @param {string} tipo - Tipo de modulo.
     * Tipos: processor, service, module e util.
     * @param {number} index - Index da systemConfiguração.
     * @param {object} systemConfig - Objeto de systemConfigurações.
     * @returns {object} Retorna o require do modulo.
     */
    function obterModulo(modulo, tipo, index, systemConfig) {
        if (systemConfig.dir[tipo][index] === undefined) return require(path.join(tipo, modulo));
        else {
            try {
                let caminhoModulo = path.join(metodos.DIRETORIO_API, systemConfig.dir[tipo][index], modulo);
                return require(caminhoModulo);
            } catch (e) {
                return obterModulo(modulo, tipo, ++index, systemConfig);
            };
        }
    }
    /**
     * Chamar Processor.
     * @public
     * @function processor
     * @param {string} modulo - Nome do modulo.
     * @returns {object} Retorna o require do modulo.
     */
    metodos.processor = modulo => obterModulo(modulo, systemConfig.type.processor, 0, systemConfig);
    /**
     * Chamar Service.
     * @public
     * @function service
     * @param {string} modulo - Nome do modulo.
     * @returns {object} Retorna o require do modulo.
     */
    metodos.service = modulo => obterModulo(modulo, systemConfig.type.service, 0, systemConfig);
    /**
     * Chamar modulo local.
     * @public
     * @function localModule
     * @param {string} modulo - Nome do modulo.
     * @returns {object} Retorna o require do modulo.
     */
    metodos.localModule = modulo => obterModulo(modulo, systemConfig.type.localModule, 0, systemConfig);
    /**
     * Chamar utilitario.
     * @public
     * @function util
     * @param {string} modulo - Nome do modulo.
     * @returns {object} Retorna o require do modulo.
     */
    metodos.util = modulo => obterModulo(modulo, systemConfig.type.util, 0, systemConfig);
    /**
     * Chamar recursos referente a tabelas.
     * @public
     * @function table
     * @param {string} modulo - Nome do modulo.
     * @returns {object} Retorna o require do modulo.
     */
    metodos.table = modulo => obterModulo(modulo, systemConfig.type.table, 0, systemConfig);
    /**
     * Chamar modulo node_modules.
     * @public
     * @function module
     * @param {string} modulo - Nome do modulo.
     * @returns {object} Retorna o require do modulo.
     */
    metodos.module = modulo => require(modulo);
    /**
     * Modulo de retorno de mensagens.
     * @public
     * @function message
     * @param {string} code Codigo da mensagem.
     * @param {object} optional Parametros opcionais.
     * - module: nome do modulo onde contem as mensagens. (se não encontrar, Pesquisa o padrão do sistema)
     *   Se for passado no module a string 'system', sera consultado as mensagens do sistema.
     * - value: Variavel que será substituida ou incluida.
     * @returns {object} Retorna objeto com varias propriedades.
     * - message: Contem a mensagem.
     */
    metodos.message = (code, optional) => {
        let listMessages;
        if (_.get(optional, 'module', systemConfig.default.messages) === systemConfig.default.value) {
            listMessages = systemMessages;
        } else {
            try {
                listMessages = obterModulo(systemConfig.type.message, systemConfig.type.message, 0,
                    systemConfig);
            } catch (e) {
                listMessages = systemMessages;
            }
        }
        // Mensagem que será retornada
        return _
            .chain(listMessages)
            .reduce((result, value, key) => {
                if (code === value.id_message) {
                    result = value.messages;
                }
                return result;
            }, [])
            .reduce((result, value, key) => {
                if (value.id_lang === systemConfig.default.lang) {
                    result = value.message;
                    if (_.get(optional, 'value', '')) {
                        if (_.isString(optional.value)) {
                            result.message = optional.value
                        } else {
                            for (let prop in optional.value) {
                                result[prop] = optional.value[prop];
                            }
                        }
                    }
                }
                return result;
            }, {})
            .value();
    };
    /**
     * Gera token de acesso.
     * @public
     * @function createToken
     * @param {object} user Usuario que esta se autenticando.
     * @returns {string} Retorna token do acesso.
     */
    metodos.createToken = user => jwt.sign(user, Buffer.from(keys.auth.secret, 'binary').toString('base64'), {
        expiresIn: keys.auth.expiresIn
    });
    /**
     * Valida token de acesso.
     * @public
     * @function verifyToken
     * @param {object} token Token que será verificado.
     * @param {object} callback Callback de retorno.
     * @returns {void}
     */
    metodos.verifyToken = (token, callback) => jwt.verify(token, Buffer.from(keys.auth.secret, 'binary').toString(
        'base64'), callback);
    /**
     * Decode do token.
     * @public
     * @function decodeToken
     * @param {object} token Token que será decodificado.
     * @returns {void}
     */
    metodos.decodeToken = (token) => jwt.decode(token);
    /**
     * Chamar classe (orientado a objeto).
     * @private
     * @function obterClasse
     * @param {string} modulo - Nome do modulo.
     * @param {string} tipo - Tipo de modulo.
     * Tipos: processor, service, module e util.
     * @param {number} index - Index da systemConfiguração.
     * @param {object} systemConfig - Objeto de systemConfigurações.
     * @returns {object} Retorna o require do modulo.
     */
    function obterClasse(modulo, tipo, index, systemConfig, contexto) {
        if (systemConfig.dir[tipo][index] === undefined) return require(path.join(tipo, modulo));
        else {
            try {
                let caminhoModulo = path.join(metodos.DIRETORIO_API, systemConfig.dir[tipo][index], modulo);
                let Classe = require(caminhoModulo);
                return new Classe(contexto);
            } catch (e) {
                return obterClasse(modulo, tipo, ++index, systemConfig, contexto);
            };
        }
    }
    /**
     * Chamar Processor (orientação objeto).
     * @public
     * @function processorClass
     * @param {string} objeto Nome do objeto.
     * @returns {function} Retorna a function do constructor da classe.
     */
    metodos.processorClass = objeto => {
        return (contexto) => {
            return obterClasse(objeto, systemConfig.type.processor, 0, systemConfig, contexto);
        }
    }
    /**
     * Chamar Service (orientação objeto).
     * @public
     * @function serviceClass
     * @param {string} objeto Nome do objeto.
     * @returns {function} Retorna a function do constructor da classe.
     */
    metodos.serviceClass = objeto => {
        return (contexto) => {
            return obterClasse(objeto, systemConfig.type.service, 0, systemConfig, contexto);
        }
    }
    /**
     * Chamar localModule (orientação objeto).
     * @public
     * @function localModuleClass
     * @param {string} objeto Nome do objeto.
     * @returns {function} Retorna a function do constructor da classe.
     */
    metodos.localModuleClass = objeto => {
        return (contexto) => {
            return obterClasse(objeto, systemConfig.type.localModule, 0, systemConfig, contexto);
        }
    }
    /* 
     * Retornar modulos disponiveis. 
     */
    return metodos;
};
