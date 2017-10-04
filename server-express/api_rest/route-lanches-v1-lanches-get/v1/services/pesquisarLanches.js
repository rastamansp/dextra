/**
 * @file Service para pesquisar ingredientes.
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
        var lanches = context.service('lanches-crud')(context);

        // Executar inclusão de lanches
        lanches.consultarLanches(pesquisa, function(erro, resultado) {
            console.log('=========================');
            console.log('resultado');
            console.log(JSON.stringify(resultado));
            console.log('=========================');
            return done(erro, resultado);
        });
    };

    // Retornar funcões
    return metodos;

};