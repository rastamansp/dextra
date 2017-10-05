/**
 * @file Service de atualização da ingrediente.
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
     * Executa a inclusão de compra.
     * @param {object} request Contem a pesquisa e a atualizacao.
     * @param {object} done - Callback de retorno.
     */
    metodos.executa = function(request, done) {

        // Chama o service compras-crud compartilhado
        var ingredientes = context.service('ingredientes-crud')(context);

        // Executar inclusão de ingredientes
        ingredientes.atualizarIngrediente(request.ingrediente, request.atualizacao, function(erro, resultado) {
            return done(erro, request.atualizacao);
        });

    };

    // Retornar funcões
    return metodos;

};