/**
 * @file Servidor de APIs REST
 * @since 2017-05-14
 * @author @douglaspands.
 */
'use strict';
module.exports = callback => {
    // Async - Modulo de controle do fluxo execuções.
    const async = require('async');
    // Criando objeto de contexto das rotas.
    const contexto = require('./modules/context')();
    // Criando servidor HTTP.
    const servidor = require('./modules/server');
    // Modulos para geração de logs
    const logs = require('./modules/logs');
    // Gerando tarefas que serão executadas em paralelo.
    let execucoes = require('./modules/tasks')(servidor, contexto, logs)
        .inicializacao(process.argv);
    // Execuções paralelas
    async.parallel(execucoes, (erro, resultados) => {
        // Preparando inicialização do servidor.
        contexto.preparacao(resultados);
        // Inicializando o servidor.
        return servidor.listen(contexto.PORT, contexto.URL, () => {
            // Callback retornando o objeto de contexto e o servidor ativo.
            if (typeof callback === 'function') callback(null, {
                server: servidor,
                context: contexto
            });
            // Gerando log de inicialização.
            else logs.inicializacao(contexto);
        });
    });
};
