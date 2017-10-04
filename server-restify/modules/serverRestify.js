/**
 * @file Configurando e parametrizando o servidor Restify.
 * @since 2017-06-15
 * @author @douglaspands.
 */
'use strict';
// Modulo com utilitarios
const _ = require('lodash');
// Modulo de criação de servidores rest
const restify = require('restify');
// Package do projeto
const systemConfig = require('../config/config');
// Configurações do Restify
const option = require('../config/restify');
// Verifica se tem parametros validos para o SSL
if (_.get(systemConfig, 'ssl')) {
    const fs = require('fs');
    if (fs.existsSync(_.get(systemConfig.ssl, 'certificate', '')) && fs.existsSync(_.get(systemConfig.ssl, 'key', ''))) {
        option.createServer.certificate = fs.readFileSync(systemConfig.ssl.certificate);
        option.createServer.key = fs.readFileSync(systemConfig.ssl.key)
    }
}
// Retornando servidor HTTP
module.exports = restify
    // Create server
    .createServer(option.createServer)
    // GzipResponse
    .use(restify.plugins.gzipResponse())
    // QueryParser
    .use(restify.plugins.queryParser(option.queryParser))
    // BodyParser
    .use(restify.plugins.bodyParser(option.bodyParser))
    // Throttle
    .use(restify.plugins.throttle({
        burst: 100,
        rate: 50,
        ip: true
    }));
