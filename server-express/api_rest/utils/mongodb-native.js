/**
 * @file CRUD MongoDB (Driver Nativo).
 * Utilizando conexão compartilhada.
 * @since 2017-05-19
 * @author @pedroalmeida.
 */
'use strict';
/**
 * Construtor de conexão
 * @constructor
 * @param {object} context Objeto de contexto para acesso.
 */
module.exports = function(context) {
    // Operações CRUD
    var operacoes = {};
    // Conexao com o banco de dados
    var db = context.mongodb;
    /**
     * Operação de inclusão de documento.
     * @public
     * @param {array} documents Documento (JSON).
     * @param {object} collection Tabela.
     * @param {callback} done Callback de retorno.
     */
    operacoes.insert = function(documents, collection, done) {
        try {
            // Inclui documentos na tabela
            db.collection(collection).insertMany(documents, function(err, result) {
                return done(err, result);
            });
        } catch (error) {
            return done(error, null);
        };
    };
    /**
     * Operação de consulta de documento.
     * @public
     * @param {object} query Parametros de consulta.
     * @param {object} collection Tabela.
     * @param {callback} done Callback de retorno.
     */
    operacoes.find = function(query, collection, done) {
        try {
            // Consulta de documento na base
            db.collection(collection).find(query).toArray(function(err, docs) {
                return done(err, docs);
            });
        } catch (error) {
            return done(error, null);
        };
    };
    /**
     * Operação de exclusão de documento.
     * @public
     * @param {object} query Parametros de exclusão do documento.
     * @param {object} collection Tabela.
     * @param {callback} done Callback de retorno.
     */
    operacoes.delete = function(query, collection, done) {
        try {
            // Executa a exclusão de documento nas bases
            db.collection(collection).deleteMany(query, function(err, result) {
                return done(err, result);
            });
        } catch (error) {
            return done(error, null);
        };
    };
    /**
     * Operação de atualização de documento.
     * @public
     * @param {object} query Parametros de consulta do documento.
     * @param {object} set Parametro que será atualizado.
     * @param {object} collection Tabela.
     * @param {callback} done Callback de retorno.
     */
    operacoes.update = function(query, set, collection, done) {
        try {
            // Executa a atualização de documento nas bases
            db.collection(collection).updateMany(query, set, function(err, result) {
                return done(err, result);
            });
        } catch (error) {
            return done(error, null);
        };
    };
    /**
     * Transforma hexString para ObjectID.
     * @public
     * @param {string} id id em hexString.
     * @returns {object} ObjectID.
     */
    operacoes.hexStringToObjectID = function(id) {

        var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");

        // Validação se valor é um hexString
        if (!checkForHexRegExp.test(id)) {
            return undefined;
        }
        // Modulo para validar ObjectID
        var ObjectID = context.module('mongodb').ObjectID;
        return ObjectID.createFromHexString(id)

    };
    // Operações
    return operacoes;
};