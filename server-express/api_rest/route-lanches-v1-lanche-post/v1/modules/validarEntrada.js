/**
 * @file Validar parametros da entrada.
 * @since 2017-06-05
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
     * Validar informações da entrada.
     * @public
     * @function validar
     * @param {object} entrada Parametros recebidos na entrada.
     * @returns {array} Lista de erros se houver
     */
    metodos.validar = function(entrada) {

        // Utilitarios de javascript
        var _ = context.module('lodash');

        // Erros
        var erros = [];

        // Valida ids
        // IGNORADO _ids por não utilizar banco de dados
        // entrada.ingredientes.map(function(ingrediente) {
        //     if (!_.isString(ingrediente._id) || _.size(ingrediente._id) < 1) {
        //         erros.push({
        //             mensagem: 'Path parameter _id invalido.',
        //             valor: ingrediente._id || ''
        //         });
        //     } else {
        //         var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");
        //         if (!checkForHexRegExp.test(ingrediente._id)) {
        //             erros.push({
        //                 mensagem: 'Valor do _id invalido.',
        //                 valor: ingrediente._id || ''
        //             });
        //         }
        //     }
        // });

        return erros;

    };

    // Retornos
    return metodos;

};