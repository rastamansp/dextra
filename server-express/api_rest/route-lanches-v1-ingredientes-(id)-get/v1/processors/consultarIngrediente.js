/**
 * @file Processor para consultar ingrediente.
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
     * Transforma retorno do service.
     * @private
     * @function formataRetorno
     * @param {object} resultado Representa a consulta do usuario.
     * @returns {object} Formata para o layout de retorno.
     */
    function formataRetorno(resultado) {
        var retorno = {
            data: resultado
        };
        retorno.data.links = [{
                rel: 'excluir_ingrediente',
                href: '/lanches/v1/ingredientes/' + resultado['_id'],
                title: 'Excluir ingrediente',
                method: 'DELETE'
            },
            {
                rel: 'alterar_ingrediente',
                href: '/lanches/v1/ingredientes/' + resultado['_id'],
                title: 'Alterar ingrediente',
                method: 'PUT'
            }
        ];
        return retorno;
    };
    /**
     * Executa processamento principal.
     * @public
     * @function executa
     * @param {object} ingrediente Representa o cadastro do ingrediente.
     * @param {object} done - Callback de retorno.
     */
    metodos.executa = function(ingrediente, done) {

        // Modulos
        /// Utilitarios do javascript
        var _ = context.module('lodash');

        /// Executando o require do service
        var service = context.service('consultarIngrediente')(context);

        // Obtendo informações do usuario
        var request = {
            _id: ingrediente.id
        };

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
                if (resultado === undefined) {
                    return done({
                        statusCode: 404,
                        codigo: 'Erro na consulta de ingrediente.',
                        mensagem: 'Ingrediente não encontrado.'
                    }, null);
                } else {
                    return done(null, formataRetorno(resultado));
                }
            }
        })
    };

    // Retornos
    return metodos;

};