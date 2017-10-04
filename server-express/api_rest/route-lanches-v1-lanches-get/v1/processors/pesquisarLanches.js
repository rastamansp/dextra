/**
 * @file Processor para consultar lanches.
 * @since 2017-10-03
 * @author @pedroalmeida.
 */
'use strict';
/**
 * @constructor 
 * @param {object} context - Objeto de contexto do motor de apis.
 */
module.exports = function(context) {

    // Modulos
    /// Utilitarios do javascript
    var _ = context.module('lodash');

    // Funções para serem exportadas.
    var metodos = {};

    /**
     * Transforma retorno do service.
     * @private
     * @function formataRetorno
     * @param {object} resultado Representa uma lista de lanches.
     * @returns {object} Formata para o layout de retorno.
     */
    function formataRetorno(resultado, view) {
        var retorno = {};

        if (_.size(resultado) > 0) {
            // Tratar views
            if (view !== 'totalizador') {
                // Formata retorno
                retorno.data = _.map(resultado, function(lanche) {
                    return {
                        nome: lanche.nome,
                        valor: lanche.valor,
                        ingredientes: lanche.ingredientes,
                        links: [{
                            rel: 'consultar_lanches',
                            href: '/lanches/v1/lanches/' + lanche['_id'],
                            title: 'Consultar lanches',
                            method: 'GET'
                        }]
                    };
                });
            }
            retorno.summary = [{
                field: 'lanche',
                value: {
                    amount: resultado.length,
                    unity: 'lanche'
                }
            }];
        }
        return retorno;
    }
    /**
     * Executa processamento principal.
     * @public
     * @function executa
     * @param {object} pesquisa Parametros de pesquisa.
     * @param {object} done - Callback de retorno.
     */
    metodos.executa = function(pesquisa, done) {

        // Modulo de lodash
        const _ = context.module('lodash');

        // Executando o require do service
        var service = context.service('pesquisarLanches')(context);

        // Obtendo informações de pesquisa
        var request = pesquisa;

        // View
        var view = _.get(pesquisa, 'view', '');

        // Executa service
        service.executa(request, function(erro, resultado) {
            if (erro) {
                return done({
                    statusCode: 500,
                    codigo: 'Erro na execução do service.',
                    mensagem: erro
                }, null);
            } else {
                // Retorno da requisição
                return done(null, formataRetorno(resultado, view));
            }
        })
    };

    // Retornos
    return metodos;

};