/**
 * @file Gerador de logs.
 * @since 2017-05-20
 * @author @douglaspands.
 */
'use strict';
/**
 * Gera logs de inicializacao.
 * @function inicializacao
 * @param {object} context - Objeto com variaveis de contexto da api.
 * @returns {void}
 */
function inicializacao(context) {
    const SERVIDOR_URL_PORTA = 'http://' + context.URL + ':' + context.PORT;
    console.log('> (\u2713) %s (%s) disponivel na url: %s', (context.SERVER_NAME).toUpperCase(), context.SERVER_VERSION,
        SERVIDOR_URL_PORTA);
    console.log('> (\u2713) Servidor de API utilizado: %s', context.API_SERVER);

    // Verifica conexão com o MongoDB (driver nativo)
    if (context.mongodb === undefined) {
        console.log('> (X) MongoDB (native) não esta disponivel');
    } else {
        console.log('> (\u2713) MongoDB (native) esta disponivel');
    }
    // Verifica conexão com o MongoDB (mongoose)
    if (context.mongoose === undefined) {
        console.log('> (X) MongoDB (mongoose) não esta disponivel');
    } else {
        console.log('> (\u2713) MongoDB (mongoose) esta disponivel');
    }
    // Verifica o registro de rotas
    if (context.ROTAS.length < 1) {
        console.log('> (X) Não há rotas disponiveis');
    } else {
        context.ROTAS.forEach(rota => console.log('> (\u2713) Rota registrada: [%s] %s', rota.method.toUpperCase(),
            rota.route));
    }
    console.log('');
};

// Modulos exportados
module.exports = {
    inicializacao: inicializacao
};
