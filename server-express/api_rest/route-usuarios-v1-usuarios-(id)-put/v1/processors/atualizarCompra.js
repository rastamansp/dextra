/**
 * @file Processor de atualização de compra.
 * @since 2017-06-12
 * @author @pedroalmeida.
 */
'use strict';
/**
 * @constructor 
 * @param {object} context - Objeto de contexto do motor de apis.
 */
module.exports = function(context) {

    // Funções para serem exportadas.
    var metodos = {};

    /**
     * Transforma retorno do service.
     * @private
     * @function formataRetorno
     * @param {object} resultado Representa o cadastro da compra.
     * @returns {object} Formata para o layout de retorno.
     */
    function formataRetorno(resultado) {
        return {
            data: resultado
        };
    };
    /**
     * Executa processamento principal.
     * @public
     * @function executa
     * @param {object} compra Representa o cadastro da compra.
     * @param {object} atualizacao Campos para serem atualizados.
     * @param {object} done - Callback de retorno.
     */
    metodos.executa = function(compra, atualizacao, done) {

        // Modulos
        /// Utilitarios do javascript
        var _ = context.module('lodash');

        /// Executando o require do service
        var service = context.service('atualizarCompra')(context);

        // Obtendo informações do compra
        var request = {
            compra: {
                _id: compra.id
            },
            atualizacao: atualizacao
        };

        // Executa service
        service.executa(request, function(erro, resultado) {
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
                return done(null, formataRetorno(resultado));
            }
        })
    };

    // Retornos
    return metodos;

};