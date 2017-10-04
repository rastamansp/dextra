/**
 * @file Validar parametros do usuario.
 * @since 2017-10-03
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
     * Validar informações do ingrediente.
     * @public
     * @function validar
     * @param {object} ingrediente Objeto que representa um ingrediente.
     * @returns {array} Lista de erros se houver
     */
    metodos.validar = function(ingrediente) {

        // Utilitarios de javascript
        var _ = context.module('lodash');

        // Erros
        var erros = [];

        // Valida id
        if (!_.isString(ingrediente.id) || _.size(ingrediente.id) < 1) {
            erros.push({
                mensagem: 'Path parameter id invalido.',
                valor: ingrediente.id || ''
            });
        } else {
            var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");
            if (!checkForHexRegExp.test(ingrediente.id)) {
                erros.push({
                    mensagem: 'Valor do id invalido.',
                    valor: ingrediente.id || ''
                });
            }
        }

        return erros;

    };

    // Retornos
    return metodos;

};