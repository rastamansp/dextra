/**
 * @file Teste de cobertura da aplicacao.
 * @since 2017-06-01
 * @author @douglaspands.
 */
'use strict';
var request = require('request');
var _ = require('lodash');
var seq = 0;

describe('Execução da aplicação principal', function () {

    it((++seq) + ' - Sucesso - Request em uma API de teste (statusCode: 200) - Criptografia de senha OK', function (done) {
        process.argv = _.pull(process.argv, '--nodb');
        var statusCode = 200;
        require('../app')(function (err, data) {
            request({
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'GET',
                uri: 'http://localhost:32000/testes/v1/testes?teste=password_sucess&pass=12345'
            }, function (error, response, body) {
                var testSucess = false;
                body = JSON.parse(body);
                console.log(body);
                if (_.includes([statusCode], response.statusCode) && body.data.cripto === '35b5c1027626cb006c45c15d09f1cee9085b6cc6a4b216b9d73b49ef40cfec20') {
                    testSucess = true;
                }
                data.server.close(function () {
                    if (testSucess === true) {
                        return done();
                    } else {
                        return done('erro');
                    }
                });
            });
        });
    });

    it((++seq) + ' - Erro - Request em uma API de teste (statusCode: 200) - Criptografia de senha NOK', function (done) {
        process.argv = _.pull(process.argv, '--nodb');
        var statusCode = 200;
        require('../app')(function (err, data) {
            request({
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'GET',
                uri: 'http://localhost:32000/testes/v1/testes?teste=password_error'
            }, function (error, response, body) {
                var testSucess = false;
                body = JSON.parse(body);
                if (_.includes([statusCode], response.statusCode) && body.data.cripto === '') {
                    testSucess = true;
                }
                data.server.close(function () {
                    if (testSucess === true) {
                        return done();
                    } else {
                        return done('erro');
                    }
                });
            });
        });
    });

    it((++seq) + ' - Sucesso - Request em uma API de teste (statusCode: 200)', function (done) {
        process.argv = _.pull(process.argv, '--nodb');
        var statusCode = 200;
        require('../app')(function (err, data) {
            request({
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'GET',
                uri: 'http://localhost:32000/testes/v1/testes?teste=' + statusCode
            }, function (error, response, body) {
                var testSucess = _.includes([statusCode], response.statusCode);
                data.server.close(function () {
                    if (testSucess === true) {
                        return done();
                    } else {
                        return done('erro');
                    }
                });
            });
        });
    });

    it((++seq) + ' - Sucesso - Request em uma API de teste (statusCode: 204)', function (done) {
        process.argv = _.pull(process.argv, '--nodb');
        var statusCode = 204;
        require('../app')(function (err, data) {
            request({
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'GET',
                uri: 'http://localhost:32000/testes/v1/testes?teste=' + statusCode
            }, function (error, response, body) {
                var testSucess = _.includes([statusCode], response.statusCode);
                data.server.close(function () {
                    if (testSucess === true) {
                        return done();
                    } else {
                        return done('erro');
                    }
                });
            });
        });
    });

    it((++seq) + ' - Erro - Request em uma API de teste (statusCode: 500) - Modulo não encontrado', function (done) {
        process.argv = _.pull(process.argv, '--nodb');
        var statusCode = 500;
        require('../app')(function (err, data) {
            request({
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'GET',
                uri: 'http://localhost:32000/testes/v1/testes?teste=module_notfound'
            }, function (error, response, body) {
                var testSucess = _.includes([statusCode], response.statusCode);
                data.server.close(function () {
                    if (testSucess === true) {
                        return done();
                    } else {
                        return done('erro');
                    }
                });
            });
        });
    });

    it((++seq) + ' - Erro - Request em uma API de teste (statusCode: 500) - Processor não encontrado', function (done) {
        process.argv = _.pull(process.argv, '--nodb');
        var statusCode = 500;
        require('../app')(function (err, data) {
            request({
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'GET',
                uri: 'http://localhost:32000/testes/v1/testes?teste=processor_notfound'
            }, function (error, response, body) {
                var testSucess = _.includes([statusCode], response.statusCode);
                data.server.close(function () {
                    if (testSucess === true) {
                        return done();
                    } else {
                        return done('erro');
                    }
                });
            });
        });
    });

    it((++seq) + ' - Erro - Request em uma API de teste (statusCode: 500) - Service não encontrado', function (done) {
        process.argv = _.pull(process.argv, '--nodb');
        var statusCode = 500;
        require('../app')(function (err, data) {
            request({
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'GET',
                uri: 'http://localhost:32000/testes/v1/testes?teste=service_notfound'
            }, function (error, response, body) {
                var testSucess = _.includes([statusCode], response.statusCode);
                data.server.close(function () {
                    if (testSucess === true) {
                        return done();
                    } else {
                        return done('erro');
                    }
                });
            });
        });
    });

    it((++seq) + ' - Erro - Request em uma API de teste (statusCode: 500) - localModule não encontrado', function (done) {
        process.argv = _.pull(process.argv, '--nodb');
        var statusCode = 500;
        require('../app')(function (err, data) {
            request({
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'GET',
                uri: 'http://localhost:32000/testes/v1/testes?teste=localModule_notfound'
            }, function (error, response, body) {
                var testSucess = _.includes([statusCode], response.statusCode);
                data.server.close(function () {
                    if (testSucess === true) {
                        return done();
                    } else {
                        return done('erro');
                    }
                });
            });
        });
    });

    it((++seq) + ' - Erro - Request em uma API de teste (statusCode: 500) - util não encontrado', function (done) {
        process.argv = _.pull(process.argv, '--nodb');
        var statusCode = 500;
        require('../app')(function (err, data) {
            request({
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'GET',
                uri: 'http://localhost:32000/testes/v1/testes?teste=util_notfound'
            }, function (error, response, body) {
                var testSucess = _.includes([statusCode], response.statusCode);
                data.server.close(function () {
                    if (testSucess === true) {
                        return done();
                    } else {
                        return done('erro');
                    }
                });
            });
        });
    });

    it((++seq) + ' - Erro - Request em uma API de teste (statusCode: 500) - table não encontrado', function (done) {
        process.argv = _.pull(process.argv, '--nodb');
        var statusCode = 500;
        require('../app')(function (err, data) {
            request({
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'GET',
                uri: 'http://localhost:32000/testes/v1/testes?teste=table_notfound'
            }, function (error, response, body) {
                var testSucess = _.includes([statusCode], response.statusCode);
                data.server.close(function () {
                    if (testSucess === true) {
                        return done();
                    } else {
                        return done('erro');
                    }
                });
            });
        });
    });

    it((++seq) + ' - Sucesso - Com acesso ao banco de dados', function (done) {
        process.argv = _.pull(process.argv, '--nodb');
        require('../app')(function (err, data) {
            data.server.close(function () {
                if (_.includes([data.context.mongodb, data.context.mongoose], undefined)) {
                    return done('erro');
                } else {
                    return done();
                }
            });
        });
    });

    it((++seq) + ' - Sucesso - Sem acesso ao banco de dados', function (done) {
        process.argv = _.pull(process.argv, '--nodb');
        process.argv.push('--nodb');
        require('../app')(function (err, data) {
            data.server.close(function () {
                if (_.includes([data.context.mongodb, data.context.mongoose], undefined)) {
                    return done();
                } else {
                    return done('erro');
                }
            });
        });
    });

    it((++seq) + ' - Sucesso - Sem acesso ao banco de dados e sem callback', function (done) {
        process.argv = _.pull(process.argv, '--nodb');
        process.argv.push('--nodb');
        require('../app')();
        done();
    });

});
