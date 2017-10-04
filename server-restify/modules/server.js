/**
 * @file Obtendo o modulo de servidor.
 * @since 2017-06-15
 * @author @douglaspands.
 */
'use strict';
// Utilitarios para o ECMAScript
const _ = require('lodash');
// Configurações da aplicação.
const serverConfig = require('../config/server');
// Retornando servidor
module.exports = require('./' + _.get(serverConfig.modules, serverConfig.framework, 'serverRestify'));
