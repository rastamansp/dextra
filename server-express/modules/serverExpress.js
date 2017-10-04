/**
 * @file Configurando e parametrizando o servidor Express.
 * @since 2017-07-13
 * @author @douglaspands.
 */
'use strict';
// Modulo de tratamento de diretorios
const path = require('path');
// Modulo de criação de servidores rest
const express = require('express');
// Modulo de geracao de log
const logger = require('morgan');
// Modulo de tratamento de cookies
const cookieParser = require('cookie-parser');
// Modulo de tratamento de payload
const bodyParser = require('body-parser');
// Modulo de compressão de dados
const compression = require('compression');
// Modulo com utilitarios de segurança
const helmet = require('helmet');
// Retornando servidor HTTP
let server = express();
// Ajustando configurações de cookie
server.use(cookieParser());
// Gerando log
server.use(logger('dev'));
// Ajustando configurações de payload
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
    extended: true
}));
// Ajustando servidor para arquivos estaticos
server.use(express.static(path.join(__dirname, '/../public')));
// compress all requests
server.use(compression());
// helps you secure your Express apps by setting various HTTP headers
server.use(helmet());
// Exportar servidor
module.exports = server;
