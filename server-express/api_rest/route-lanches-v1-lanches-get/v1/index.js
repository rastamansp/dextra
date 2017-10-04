/**
 * @file Pesquisar lanches.
 * @since 2017-07-13
 * @author @pedroalmeida.
 */
'use strict';
/**
 * Controller da API de pesquisa de lanches.
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
    var usuario = context.localModule('validar')(context);

    // Armazena erros gerados no validador
    var erros = usuario.validar(req.query);

    // Verifica se tem erros
    if (_.size(erros) > 0) {
        return res.status(400).jsonp({
            code: 'Erro na validação dos parametros de entrada.',
            message: erros
        });
    }

    // Chama processor
    var processor = context.processor('pesquisarLanches')(context);

    // Executa processor
    return processor.executa(req.query, function(erro, resultado) {
        // Trata condições de erro.
        if (erro) {
            return res.status(erro.statusCode).jsonp({
                code: erro.codigo,
                message: erro.mensagem
            });
        } else {
            // Se resultado for OK.
            if (_.isEmpty(resultado)) {
                return res.status(204).end();
            } else {
                return res.status(200).jsonp(resultado);
            }
        }
    });
};