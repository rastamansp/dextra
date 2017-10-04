/**
 * @file Validar tabela de lanches.
 * @since 2017-10-03
 * @author @pedroalmeida.
 */
/**
 * @constructor 
 * @param {object} context - Objeto de contexto do motor de apis.
 */
module.exports = function(context) {
    // Funções
    var funcoes = {};

    // Layout da tabela de usuarios.
    var schema = {
        '_id': { type: 'id', required: true },
        'nome': { type: 'string', required: true },
        'ingredientes': { type: 'array', required: true },
        'valor': { type: 'number', required: true }
    };
    /**
     * Valida a tipagem do campo passado.
     * @private
     * @function verifyType
     * @param {string} type Tipo de variavel.
     * @param {any} field Campo que sera verificado a tipagem.
     * @return {boolean} Retorna true se a tipagem for a esperada.
     */
    function verifyType(type, field) {
        var _ = context.module('lodash');
        var moment = context.module('moment');
        var valid = false;
        switch (type) {
            case 'string':
                valid = _.isString(field);
                break;
            case 'number':
                valid = _.isNumber(field);
                break;
            case 'date':
                valid = moment(field).isValid();
                break;
            case 'id':
                valid = _.isString(field);
                break;
            case 'array':
                valid = _.Array(field);
                break;
            default:
                valid = true;
                break;
        };
        return valid;
    };
    /**
     * Valida se campos obrigatorios estão preenchidos.
     * @public
     * @function isValid
     * @param {object} request Parametros de entrada.
     * @return {boolean} Retorna true se os campos requiridos foram digitados.
     */
    funcoes.isValid = function(request) {
        var valid = true;
        for (var prop in schema) {
            if ((request[prop] === undefined && schema[prop].required === true) ||
                (request[prop] !== undefined && !verifyType(schema[prop].type, request[prop]))) {
                valid = false;
            }
        }
        return valid;
    };
    // Retorno de funcões
    return funcoes;
};