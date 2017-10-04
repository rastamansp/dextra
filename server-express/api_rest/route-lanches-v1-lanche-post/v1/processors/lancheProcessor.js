/**
 * @file Processor de inclusao de compra.
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

    //////
    // MOCK 
    var INGREDIENTES = {
        ALFACE: 1,
        BACON: 2,
        HAMBURGUER: 3,
        OVO: 4,
        QUEIJO: 5,
    };

    /**
     * Transforma retorno do service.
     * @private
     * @function formataRetorno
     * @param {object} resultado Representa o cotacao de lanche.
     * @returns {object} Formata para o layout de retorno.
     */
    function formataRetorno(valor, ingredientes, descontos) {
        return {
            data: {
                valor: valor,
                ingredientes: ingredientes,
                descontos: descontos
            }
        };
    }

    /**
     * Aplica descontos.
     * @private
     * @function aplicaDescontos
     * @param {object} resultado Representa o cotacao de lanche com descontos calculados.
     * @returns {object} Formata para o layout de retorno.
     */
    function aplicaDescontos(pedido, cotacao, done) {
        /// Utilitarios do javascript
        var _ = context.module('lodash');
        var descontos = [];

        ///// busca quantidade de ingredientes
        let alface = verificaIngrediente(pedido, cotacao, INGREDIENTES.ALFACE);
        let bacon = verificaIngrediente(pedido, cotacao, INGREDIENTES.BACON);
        let hamburger = verificaIngrediente(pedido, cotacao, INGREDIENTES.HAMBURGUER);
        let ovo = verificaIngrediente(pedido, cotacao, INGREDIENTES.OVO);
        let queijo = verificaIngrediente(pedido, cotacao, INGREDIENTES.QUEIJO);

        ///// Verifica promoções cumulativas
        ///// verifica quantidade de hamburger
        if (hamburger && hamburger.quantidade >= 3) {
            ///// adiciona a lista de descontos
            descontos.push({
                tipo: 'Muita carne',
                valor: ((hamburger.quantidade / 3) * hamburger.valor)
            });
        }

        ///// verifica quantidade de queijo
        if (queijo && queijo.quantidade >= 3) {
            ///// adiciona a lista de descontos
            descontos.push({
                tipo: 'Muito queijo',
                valor: ((queijo.quantidade / 3) * queijo.valor)
            });
        }

        ///// verifica light
        if ((alface && alface.quantidade) && !bacon) {
            descontos.push({
                tipo: 'Light',
                valor: '10%'
            });
        }

        let total = 0;
        let preco = 0;

        ///// itera ingredientes para compor preço
        cotacao.map(function(ingrediente) {
            total += ingrediente.quantidade * ingrediente.valor;
            preco = ingrediente.quantidade * ingrediente.valor;
        });

        ///// calcula desconto
        descontos.map(function(desconto) {
            if (desconto.tipo === 'Light') {
                ///// aplica 10% no total
                total = total - (total * 0.1);
            } else {
                ///// tira cada desconto
                total = total - desconto.valor;
            }
        });

        ///// executa done
        done(null, formataRetorno(total, cotacao, descontos));
    }


    /**
     * Retorna quantidade de ingredientes.
     * @private
     * @function verificaIngrediente
     * @param {array} pedido Array de ingredientes.
     * @param {string} tipo - tipo de ingrediente.
     */
    function verificaIngrediente(pedido, cotacao, tipo) {
        var _ = context.module('lodash');

        ///// itera ingredientes
        var ingrediente = _.find(pedido, { 'id': tipo });
        var preco = _.find(cotacao, { 'id': tipo });
        ///// verifica se foi encontrado ingrediente
        if (ingrediente) {
            preco.quantidade = ingrediente.quantidade;
            return preco;
        } else {
            return null;
        }
    }

    /**
     * Executa processamento principal.
     * @public
     * @function executa
     * @param {object} compra Representa o cadastro do compra.
     * @param {object} done - Callback de retorno.
     */
    metodos.executa = function(lanche, done) {

        // Modulos
        /// Utilitarios do javascript
        var _ = context.module('lodash');

        /// Modulo para tratar datas
        var moment = context.module('moment');

        /// Executando o require do service
        var service = context.service('lancheService')(context);

        var ids = lanche.ingredientes.map(function(ingrediente) { return ingrediente.id });

        // Obtendo informações do lanche
        var request = {
            id: {
                $in: ids
            }
        };

        // Executa service
        service.executa(request, function(erro, resultado) {
            if (erro) {
                return done({
                    statusCode: 500,
                    codigo: 'Erro na execução do service.',
                    Mensagem: erro
                }, null);
            } else {

                // Aplica descontos
                // Retorno da requisição
                return aplicaDescontos(lanche.ingredientes, resultado, done);
            }
        });
    };

    // Retornos
    return metodos;

};