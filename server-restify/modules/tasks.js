/**
 * @file Tarefas para serem executadas antes da inicialização do servidor.
 * @since 2017-05-21.
 * @author @douglaspands.
 */
'use strict';

// Modulo com utilitarios.
const _ = require('lodash');
// Parametros de configuração
const config = require('../config/config');

/**
 * @constructor
 * @param {object} server - Servidor criado pelo framework Restify.
 * @param {object} contexto - Objeto com variaveis de contexto da api.
 * @returns {function} Funções/metodos de tarefas.
 */
module.exports = (server, context) => {

    // Metodos de execução
    let metodos = {};

    /**
     * Gerar lista de funções a serem executadas.
     * @public
     * @function inicializacao
     * @param {array} args Lista de argumentos passados na execução da aplicação.
     * @returns {object} Objeto com todas as tarefas a serem executadas.
     */
    metodos.inicializacao = args => {

        // Objeto com as execuções que precisam ser feitas.
        let execucoes = {};

        if (!_.includes(args, config.db_disable)) {
            // Adicionar tarefas de criação de conexão com o MongoDB.
            execucoes.mongodb_native = require('./mongodb')(context);
            execucoes.mongoose = require('./mongoose')(context);
        }

        // Incluir execucao de varredura de rotas
        execucoes.rotas = require('./routes')(server, context);

        // Lista de execuções.
        return execucoes;
    };

    // Retorno de metodos
    return metodos;
}
