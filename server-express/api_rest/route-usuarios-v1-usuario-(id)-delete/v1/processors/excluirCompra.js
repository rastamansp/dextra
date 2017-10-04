/**
 * @file Processor para excluir compra.
 * @since 2017-06-12
 * @author @douglaspands.
 */
'use strict';
/**
 * @constructor 
 * @param {object} context - Objeto de contexto do motor de apis.
 */
module.exports = function (context) {

    // Funções para serem exportadas.
    var metodos = {};

    /**
     * Executa processamento principal.
     * @public
     * @function executa
     * @param {object} compra Representa a compra.
     * @param {object} done - Callback de retorno.
     */
    metodos.executa = function (compra, done) {

        // Modulos
        /// Utilitarios do javascript
        var _ = context.module('lodash');

        /// Executando o require do service
        var service = context.service('excluirCompra')(context);

        // Obtendo informações do compra
        var request = {
            _id: compra.id
        };

        // Executa service
        service.executa(request, function (erro, resultado) {
            if (erro) {
                if (erro.code) {
                    return done({
                        statusCode: 422,
                        codigo: erro.code,
                        mensagem: erro.message
                    }, null);
                } else {
                    return done({
                        statusCode: 500,
                        codigo: 'Erro na execução do service.',
                        mensagem: erro
                    }, null);
                }
            } else {
                // Retorno da requisição
                return done(null, {});
            }
        })
    };

    // Retornos
    return metodos;

};
