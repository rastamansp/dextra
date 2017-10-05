/**
 * @file Validar parametros recebidos no path e body.
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
     * Validar informações do body.
     * @public
     * @function validar
     * @param {object} params Objeto que representa o path parameter.
     * @param {object} body Objeto que representa um body.
     * @returns {array} Lista de erros se houver
     */
    metodos.validar = function(params, body) {

        // Utilitarios de javascript
        var _ = context.module('lodash');

        // Erros
        var erros = [];

        // Valida id
        if (!_.isString(params.id) || _.size(params.id) < 1) {
            erros.push({
                mensagem: 'Path parameter id invalido.',
                valor: params.id || ''
            });
        } else {
            var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");
            if (!checkForHexRegExp.test(params.id)) {
                erros.push({
                    mensagem: 'Valor do id invalido.',
                    valor: params.id || ''
                });
            }
        }

        if (body) {
            // Verificar se contem o campo _id na atualização.
            if (body['_id'] !== undefined) {
                erros.push({
                    mensagem: 'Não é permitido atualizar o campo _id.',
                    valor: body['_id'] || ''
                });
            }
        }

        ////
        // DEMAIS validações

        return erros;

    };

    // Retornos
    return metodos;

};