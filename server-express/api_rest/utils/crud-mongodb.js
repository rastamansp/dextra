/**
 * @file CRUD MongoDB (Driver Nativo).
 * Abrindo e fechando conexão a cada execução.
 * @since 2017-05-14
 * @author @douglaspands.
 */
'use strict';
/**
 * Construtor de conexão
 * @constructor
 * @param {object} database Database.
 * @param {object} context Objeto de contexto para acesso.
 */
module.exports = function (database, context) {

    // Driver para conexão com o MongoDB
    var MongoClient = require('mongodb').MongoClient;
    // url de conexão
    var url = context.MONGODB_URL + database;

    // Operações CRUD
    var operacoes = {};

    /**
     * Operação de inclusão de documento.
     * @public
     * @param {object} document - Documento (JSON).
     * @param {object} collection - Tabela.
     * @param {object} done - Callback de retorno.
     */
    operacoes.insert = function (document, collection, done) {
        try {
            // Executando conexão com banco 
            MongoClient.connect(url, function (err, db) {
                if (err) {
                    done(err, null);
                } else {
                    // Inclui documentos na tabela
                    db.collection(collection).insertMany(document, function (err, result) {
                        db.close();
                        done(err, result);
                    });
                };
            });
        } catch (error) {
            done(error, null);
        };
    };

    /**
     * Operação de consulta de documento.
     * @public
     * @param {object} query - Parametros de consulta.
     * @param {object} collection - Tabela.
     * @param {object} done - Callback de retorno.
     */
    operacoes.find = function (query, collection, done) {
        try {
            // Executando conexão com banco
            MongoClient.connect(url, function (err, db) {
                if (err) {
                    done(err, null);
                } else {
                    // Consulta de documento na base
                    db.collection(collection).find(query).toArray(function (err, docs) {
                        db.close();
                        done(err, docs);
                    });
                };
            });
        } catch (error) {
            done(error, null);
        };
    };

    /**
     * Operação de exclusão de documento.
     * @public
     * @param {object} query - Parametros de exclusão do documento.
     * @param {object} collection - Tabela.
     * @param {object} done - Callback de retorno.
     */
    operacoes.delete = function (query, collection, done) {
        try {
            // Executando conexão com banco
            MongoClient.connect(url, function (err, db) {
                if (err) {
                    done(err, null);
                } else {
                    // Executa a exclusão de documento nas bases
                    db.collection(collection).deleteMany(query, function (err, result) {
                        db.close();
                        done(err, result);
                    });
                };
            });
        } catch (error) {
            done(error, null);
        };
    };

    /**
     * Operação de atualização de documento.
     * @public
     * @param {object} query - Parametros de consulta do documento.
     * @param {object} set - Parametro que será atualizado.
     * @param {object} collection - Tabela.
     * @param {object} done - Callback de retorno.
     */
    operacoes.update = function (query, set, collection, callback) {
        try {
            // Executando conexão com banco            
            MongoClient.connect(url, function (err, db) {
                if (err) {
                    done(err, null);
                } else {
                    // Executa a atualização de documento nas bases
                    db.collection(collection).updateMany(query, set, function (err, result) {
                        db.close();
                        done(err, result);
                    });
                };
            });
        } catch (error) {
            done(error, null);
        };
    };

    // Operações
    return operacoes;
};
