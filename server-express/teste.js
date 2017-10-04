var _ = require('lodash');
var cotacao = [{ "_id": "59d4041088b13b75e73dbc34", "id": 2, "nome": "Bacon", "valor": 2, "__v": 0 }, {
    "_id": "59d4041f88b13b75e73dbc35",
    "id": 3,
    "nome": "Hambúrguer de carne",
    "valor": 3,
    "__v": 0
}, { "_id": "59d4043d88b13b75e73dbc37", "nome": "Queijo", "id": 5, "valor": 1.5, "__v": 0 }];
console.log('=========================');
console.log('cotacao');
console.log(JSON.stringify(cotacao));
console.log(_.find(cotacao, { 'id': 3 }));
console.log('=========================');