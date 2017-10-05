/**
 * @file Inicializando e guardando conexão com o Mongoose.
 * @since 2017-07-21
 * @author @pedroalmeida.
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
        // Abre conexão com o banco de dados Mongoose
        return abreConexao(context, callback);
    }
};
/**
 * Monta uma conexão compartilhada no Mongoose.
 * @function abreConexao
 * @param {object} context Objeto com variaveis de contexto da api.
 * @param {callback} done Função de retorno.
 */
function abreConexao(context, done) {
    // URL + Database
    const url_database = context.MONGODB_URL + '/' + context.DATABASE_NAME.toLowerCase();
    // Driver do Mongoose
    return done(null, {
        db: require('mongoose').connect(url_database)
    });
};