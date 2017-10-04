/**
 * @file Validar parametros de consulta de lanches.
 * @since 2017-10-03
 * @author @pedroalmeida
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
     * Validar informações do query parameter.
     * @public
     * @function validar
     * @param {object} query Query parameters de pesquisa.
     * @returns {array} Lista de erros se houver.
     */
    metodos.validar = function(query) {

        // Utilitarios de javascript
        var _ = context.module('lodash');

        // Erros
        var erros = [];

        // Validar view
        if (_.get(query, 'view', '') && !_.includes(['totalizador'], query.view)) {
            erros.push({
                mensagem: 'Query parameter view invalido.',
                valor: _.get(query, 'view', '')
            });
        }

        return erros;

    };

    // Retornos
    return metodos;

};