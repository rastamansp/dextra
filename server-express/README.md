# X-CORE - SERVIDOR DE APIS REST #

Servidor de APIs REST desenvolvido em Node.js, Express e MongoDB.

## Requisitos ##

- Node.js LTS instalado ( versão >= 6.0 );
- MongoDB instalado ( versão >= 3.2 );

## Como usar ##

Executar os seguintes procedimentos:

1. Instalar modulos utilizando o comando "npm install" na pasta "./server";
2. Iniciar o servidor do MongoDB ( Ex.: mongod --dbpath ~/workspace/data );
3. Executar o "npm start" na pasta "./server".
4. Incluir os codigos fontes das api

## Recursos ##

- Mongoose instalado e configurado;
- MongoDB driver nativo instalado e configurado;
- Autenticação JWT instalado e configurado;
- Pasta de APIs REST separado do resto do motor;
- Pasta /public com arquivos estaticos (html, css, js, etc...).

## Configurações da API ##

Na pasta "api_rest" deve conter a pasta que terá o codigo fonte da API.  
Ex.: ./api_rest/route-teste-v1-teste-get.  
Dentro precisa conter um arquivo "package.json" com os seguintes parametros:  

```
{  
 "name": "route-testes-v1-testes-get",  
 "description": "Api de testes",  
 "version": "1.0.0",  
 "author": "@douglaspands",  
 "type": "api-rest",  
 "route": "/testes/v2/testes",  
 "method": "GET",  
 "controller": "v1/index.js",  
 "auth": true,
 "profile": ['user']
}
```
- **name** : Nome da pasta da api;
- **description** : Descrição da api;
- **version** : Versão da api;
- **author** : Autor da api;
- **type** : Sempre "api-rest";
- **route** : Rota da api;
- **method** : Metodo de execução da api;  
- **controller** : Nome do arquivo com a função: module.exports.controller;
- **auth** : "true" pra quando a api precisa de validação via token. Caso contrario, preencher com "false";
- **profile** : Lista de perfis de usuarios que podem utilizar essa api.  
 Essa propriedade pode ser omitida. Mas se vir preenchida, é aceito das duas maneras abaixo:
    - "profiles": "user"
    - "profiles": ["user", "admin"]

A API tendo o arquivo package.json preenchido, o motor de APIs reconhece ela.

## Contribuintes ##

- @douglaspands
- @pedroalmeida

## Versão ##

- 0.18.3 (beta)