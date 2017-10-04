/**
 * @file Validar parametros de entrada.
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
     * Validar informações de entrada.
     * @public
     * @function validar
     * @param {object} entrada Objeto que representa os parametros de entrada.
     * @returns {array} Lista de erros se houver
     */
    metodos.validar = function (entrada) {

        // Utilitarios de javascript
        var _ = context.module('lodash');

        // Erros
        var erros = [];

        // Valida id
        if (!_.isString(entrada.id) || _.size(entrada.id) < 1) {
            erros.push({
                mensagem: 'Path parameter id invalido.',
                valor: entrada.id || ''
            });
        } else {
            var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");
            if (!checkForHexRegExp.test(entrada.id)) {
                erros.push({
                    mensagem: 'Valor do id invalido.',
                    valor: entrada.id || ''
                });
            }
        }

        return erros;

    };

    // Retornos
    return metodos;

};
