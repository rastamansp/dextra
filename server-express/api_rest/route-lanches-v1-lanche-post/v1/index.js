/**
 * @file Cotar valor de novo lanche.
 * @since 2017-10-03
 * @author @pedroalmeida.
 */
'use strict';
/**
 * Controller da API de inclusão de novo lanche.
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
    var erros = entrada.validar(req.body);

    // Verifica se tem erros
    if (_.size(erros) > 0) {
        return res.send(400, {
            code: 'Erro na validação dos parametros de entrada.',
            message: erros
        });
    }

    // Chama processor
    var processor = context.processor('lancheProcessor')(context);

    // Executa processor
    processor.executa(req.body, function(erro, resultado) {
        // Trata condições de erro.
        if (erro) {
            return res.send(erro.statusCode, { code: erro.codigo, message: erro.mensagem });
        } else {
            return res.status(201).jsonp(resultado);
        }
    });
};