/**
 * @file Service para executar CRUD lanches.
 * @since 2017-07-27
 * @author @pedroalmeida.
 */
'use strict';
/**
 * @constructor 
 * @param {object} context - Objeto de contexto do motor de apis.
 */
module.exports = function(context) {

    // Utilitarios do javascript
    var _ = context.module('lodash');

    // Chama utilitario de consulta ao mongoDB
    var mongodb = context.util('mongodb-native')(context);

    // Funções exportadas
    var funcoes = {};

    /**
     * Executa a inclusão de usuarios.
     * @public
     * @function incluirUsuarios
     * @param {array} usuarios Representa uma lista de novos usuarios.
     * @param {callback} callback Callback de retorno.
     */
    funcoes.incluirUsuarios = function(usuarios, done) {

        // Obter lista de usuarios
        var listaUsuarios = usuarios;

        // Verifica se é uma lista
        if (!_.isArray(listaUsuarios)) {
            // Retorno se a não recebeu uma lista de usuarios.
            return done({
                codigo: 'Campo usuarios não é uma lista.',
                mensagem: listaUsuarios
            }, null);
        };

        // Tabela
        var collection = 'usuarios';

        // Executa consulta
        mongodb.insert(listaUsuarios, collection, function(erro, dados) {
            if (erro) {
                // Retorno se a inclusão ocorreu um problema.
                return done(erro, null);
            } else {
                // Retorno se a inclusão foi feita com sucesso.
                return done(null, dados.ops);
            }
        });
    };

    /**
     * Executa a atualização de um usuario.
     * @public
     * @function atualizarUsuario
     * @param {object} usuario Representa um usuario (necessita da propriedade _id).
     * @param {object} atualizar Bloco de dados que será atualizado.
     * @param {callback} callback Callback de retorno.
     */
    funcoes.atualizarUsuario = function(usuario, atualizar, done) {

        // Gerar Query
        var query = _.clone(usuario);

        // Converter id
        if (query['_id'] === undefined) {
            return done({
                codigo: 'Campo _id é invalido ou não veio preenchido.',
                mensagem: query['_id']
            }, null);
        } else {
            var novoId = mongodb.hexStringToObjectID(query['_id']);
            if (novoId) {
                query['_id'] = novoId;
            } else {
                // Retorno se a inclusão ocorreu um problema.
                return done({
                    codigo: 'id com valor invalido.',
                    mensagem: query['_id']
                }, null);
            }
        }

        // Gerar $set
        var set = {
            '$set': atualizar
        };

        // Tabela
        var collection = 'usuarios';

        // Executa consulta
        mongodb.update(query, set, collection, function(erro, dados) {
            if (erro) {
                // Retorno se a inclusão ocorreu um problema.
                return done(erro, null);
            } else {
                // Retorno se a inclusão foi feita com sucesso.
                if (dados.matchedCount !== 1) {
                    return done({
                        code: 'Erro no update do usuario.',
                        message: 'Foi atualizado ' + dados.matchedCount + ' usuarios.'
                    }, null);
                } else {
                    return done(null, dados);
                }
            }
        });

    };

    /**
     * Executa a consulta de Lanches.
     * @public
     * @function consultarLanches
     * @param {object} pesquisa Campo de pesquisa de Lanches.
     * @param {callback} done Callback de retorno.
     */
    funcoes.consultarLanches = function(pesquisa, done) {

        // Utilitarios do javascript
        var _ = context.module('lodash');

        // Gerar query
        var query = _.clone(pesquisa);

        // Query
        if (_.get(query, '_id', '')) {
            var novoId = mongodb.hexStringToObjectID(query['_id']);
            if (novoId) {
                query['_id'] = novoId;
            } else {
                // Retorno se a inclusão ocorreu um problema.
                return done({
                    codigo: 'id com valor invalido.',
                    mensagem: query['_id']
                }, null);
            }
        }

        // Tabela
        var collection = 'lanches';

        // Executa consulta
        mongodb.find(query, collection, function(erro, dados) {
            if (erro) {
                // Retorno se a inclusão ocorreu um problema.
                return done(erro, null);
            } else {
                // Retorno a consulta com sucesso.
                return done(null, dados);
            }
        });

    };

    /**
     * Executa a exclusão de usuarios.
     * @public
     * @function excluirUsuarios
     * @param {array} pesquisas Lista de pesquisas de usuarios para serem removidos.
     * @param {callback} done Callback de retorno.
     */
    funcoes.excluirUsuarios = function(pesquisa, done) {

        // Gerar query
        var query = _.clone(pesquisa);

        // Query
        if (query['_id'] !== undefined) {
            var novoId = mongodb.hexStringToObjectID(query['_id']);
            if (novoId) {
                query['_id'] = novoId;
            } else {
                // Retorno se a inclusão ocorreu um problema.
                return done({
                    codigo: 'id com valor invalido.',
                    mensagem: query['_id']
                }, null);
            }
        }

        // Tabela
        var collection = 'usuarios';

        // Executa consulta
        mongodb.delete(query, collection, function(erro, dados) {
            if (erro) {
                // Retorno se a inclusão ocorreu um problema.
                return done(erro, null);
            } else {
                // Retorno se a inclusão foi feita com sucesso.
                if (dados.deletedCount !== 1) {
                    return done({
                        code: 'Erro no delete do usuario.',
                        message: 'Foi excluido ' + dados.deletedCount + ' usuarios.'
                    }, null);
                } else {
                    return done(null, dados);
                }
            }
        });

    };

    // Funções de retorno
    return funcoes;

};