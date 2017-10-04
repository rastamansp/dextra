/**
 * @file Service para consultar ingrediente.
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
     * Executa a consulta de usuario.
     * @param {object} usuario Representa um usuario (campo id).
     * @param {object} done - Callback de retorno.
     */
    metodos.executa = function(pesquisa, done) {

        // Chama o service usuarios-crud compartilhado
        var ingredientes = context.service('ingredientes-crud')(context);

        // Executar inclusão de ingredientes
        ingredientes.consultarIngredientes(pesquisa, function(erro, resultado) {
            if (erro) {
                return done(erro, null);
            } else {
                return done(null, resultado[0]);
            }
        });

    };

    // Retornar funcões
    return metodos;

};