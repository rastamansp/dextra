/**
 * @file Atualizar compra.
 * @since 2017-06-12
 * @author @pedroalmeida.
 */
'use strict';
/**
 * Controller da API de atualização de compra.
 * @public
 * @function controller
 * @param {object} req Objeto com parametros, query e body recebidos pela request http.
 * @param {object} context Objeto de contexto das APIs. 
 * @param {object} res Objeto com funções de response http.
 */
module.exports.controller = function(req, res, context) {

    // Utilitarios do javascript
    var _ = context.module('lodash');

    // Validar parametros de entrada.
    var entrada = context.localModule('validarEntrada')(context);

    // Armazena erros gerados no validador
    var erros = entrada.validar(req.params, req.body);

    // Verifica se tem erros
    if (_.size(erros) > 0) {
        return res.send(400, {
            code: 'Erro na validação dos parametros de entrada.',
            message: erros
        });
    }

    // Chama processor
    var processor = context.processor('atualizarCompra')(context);

    // Executa processor
    processor.executa(req.params, req.body, function(erro, resultado) {
        // Trata condições de erro.
        if (erro) {
            return res.send(erro.statusCode, { code: erro.codigo, message: erro.mensagem });
        } else {
            return res.send(200, resultado);
        }
    });
};