/**
 * @file Service para excluir compra.
 * @since 2017-06-12
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
     * Executa a exclusão de compra.
     * @param {object} compra Representa uma compra (campo id).
     * @param {object} done - Callback de retorno.
     */
    metodos.executa = function(pesquisa, done) {

        // Chama o service compras-crud compartilhado
        var compras = context.service('compras-crud')(context);

        // Executar inclusão de compras
        compras.excluirCompra(pesquisa, function(erro, resultado) {
            // Retorno da requisição
            return done(erro, resultado);
        });

    };

    // Retornar funcões
    return metodos;

};