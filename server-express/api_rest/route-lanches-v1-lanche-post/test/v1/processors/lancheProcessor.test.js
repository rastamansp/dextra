/**
 * @file Teste de cobertura da rota POST lanches/v1/lanches.
 * @since 2017-10-04
 * @author @pedroalmeida.
 */
'use strict';
var request = require('request');
var _ = require('lodash');
var seq = 0;

describe('Execução de Processor da Rota POST: /lanches/v1/lanches', function() {

    it((++seq) + ' - Sucesso', function(done) {

        let processor = require('../../../v1/processors/lancheProcessor');

        console.log('=========================');
        console.log('processor');
        console.log(JSON.stringify(processor));
        console.log('=========================');

        ////// mocks
        const mocks = {
            context: {
                module: function(name) { return require(name); },
                service: function(name) { return require('../services/' + name); },
            },
            request: {

            },
            response: {
                send: function(httpStatusCode, json) {}
            }
        };

        processor = processor(mocks.request, mocks.response, mocks.context);

        console.log('=========================');
        console.log('processor');
        console.log(processor);
        console.log('=========================');

    });

});