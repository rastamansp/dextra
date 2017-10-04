/**
 * @file Validar tabela de usuarios.
 * @since 2017-05-20
 * @author @douglapands.
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
        'imagem': { type: 'string', required: true },
        'descricao': { type: 'string', required: true },
        'nome': { type: 'string', required: true },
        'sexo': { type: 'string', required: true },
        'telefone': { type: 'string', required: true },
        'dataNascimento': { type: 'string', required: true },
        'pais': { type: 'string', required: true },
        'estado': { type: 'string', required: true },
        'cidade': { type: 'number', required: true },
        'cep': { type: 'string', required: true },
        'loginsAcesso': [{
            'email': { type: 'string', unique: true, lowercase: true },
            'senha': { type: 'string', required: true },
        }]

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