/**
 * @file Service para pesquisar usuarios.
 * @since 2017-05-21
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
        var usuarios = context.service('usuarios-crud')(context);

        // Executar inclusão de usuarios
        usuarios.consultarUsuarios(pesquisa, function(erro, resultado) {
            return done(erro, resultado);
        });

    };

    // Retornar funcões
    return metodos;

};