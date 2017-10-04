/**
 * @file Inicializando e guardando conexão com o MongoDB driver nativo.
 * @since 2017-05-20
 * @author @douglaspands.
 */
'use strict';
/**
 * @constructor
 * @param {object} contexto - Objeto com variaveis de contexto da api.
 * @returns {callback} callback de retorno.
 */
module.exports = context => {
    /**
     * @returns {function} callback do framework async
     */
    return callback => {
        // Abre conexão com o banco de dados MongoDB
        return abreConexao(context, callback);
    }
};
/**
 * Monta uma conexão compartilhada no MongoDB.
 * @function abreConexao
 * @param {object} context Objeto com variaveis de contexto da api.
 * @param {callback} done Função de retorno.
 */
function abreConexao(context, done) {
    // URL + Database.
    const url_database = context.MONGODB_URL + '/' + context.DATABASE_NAME.toLowerCase();
    // Gerando conexão com o MongoDB nativo e abrindo conexão.
    return require('mongodb').MongoClient.connect(url_database, (err, db) => done(err, {
        db: db
    }));
};
