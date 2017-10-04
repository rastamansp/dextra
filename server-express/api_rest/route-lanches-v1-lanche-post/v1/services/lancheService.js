/**
 * @file Service para cotar valor de lanches.
 * @since 2017-10-03
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
     * Executa a pesquisa de usuario.
     * @param {object} pesquisa Parametros de pesquisa.
     * @param {object} done - Callback de retorno.
     */
    metodos.executa = function(pesquisa, done) {

        // Chama o service usuarios-crud compartilhado
        var ingredientes = context.service('ingredientes-crud')(context);

        // Executar inclusão de lanches
        ingredientes.consultarIngredientes(pesquisa, function(erro, resultado) {
            return done(erro, resultado);
        });
    };

    // Retornar funcões
    return metodos;
};