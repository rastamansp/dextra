/**
 * @file Teste do objeto de log do servidor.
 * @since 2017-05-14
 * @author @douglaspands.
 */
'use strict';
// Modulo com utilitarios
var _ = require('lodash');
// Modulo de validação
var assert = require('assert');
// Modulo que será testado
var modulo = require('../../modules/logs');

describe('Execução do modulo log', function() {

    var seq = 0;

    it((++seq) + ' - Sucesso - Rotas > 0, MongoDB OK, Mongoose OK', function(done) {

        var context = {
            SERVER_NAME: 'XCORE',
            SERVER_VERSION: '0.1.1',
            URL: 'Teste',
            PORT: 8080,
            API_SERVER: 'Servidor',
            mongodb: {},
            mongoose: {},
            ROTAS: [{
                method: 'GET',
                route: 'testes/v1/testes'
            }]
        };

        modulo.inicializacao(context);
        done();

    });

    it((++seq) + ' - Sucesso - Rotas = 0, MongoDB OK, Mongoose OK', function(done) {

        var context = {
            SERVER_NAME: 'XCORE',
            SERVER_VERSION: '0.1.1',
            URL: 'Teste',
            PORT: 8080,
            API_SERVER: 'Servidor',
            mongodb: {},
            mongoose: {},
            ROTAS: []
        };

        modulo.inicializacao(context);
        done();

    });

});