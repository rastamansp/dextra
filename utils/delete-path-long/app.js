/**
 * @file Remove diretorios com muitas pastas e muito longos.
 * @author @douglaspands
 * @since 2017-06-18
 */
'use strict';
// Modulo para tratamento de arquivos
const fs = require('fs');
// Verifica se foi informado a pasta que será excluida.
if (process.argv[2] === undefined) {
    console.log('É necessario informar o diretorio que sera apagado');
    process.exit(1);
}
// Verifica se pasta existe.
if (!fs.existsSync(process.argv[2])) {
    console.log('Diretorio informado não existe ou esta errado.');
    process.exit(1);
}
// Coleção de pastas que serão excluidas.
let directorys = [
    {
        name: process.argv[2],
        // Executa o listar diretorios dentro da pasta solicitada pelo usuario. 
        in: listDirectory(process.argv[2])
    }
];
// Executa função para exclusão dos diretorios
removeDirectory(directorys[0]);
// Log de finalização.
console.log('Pasta \"%s\" foi excluida com sucesso!', process.argv[2]);
//-- FIM
/**
 * Gera coleção de pastas e arquivos encontrados.
 * @function listDirectory
 * @param {object} directory
 * Contem:
 * - directory: Path completo;
 * - in: Coleção de pastas e arquivos encontrados dentro da pasta.
 * @returns {collection} Gera uma coleção de arquivos e pastas contendo os seguintes atributos:
 * - directory: Path completo da pasta;
 * - in: Coleção de pastas e arquivos encontrados dentro da pasta.
 */
function listDirectory(directory) {
    if (!fs.existsSync(directory)) return [];
    return fs.readdirSync(directory)
        .map(function (o) {
            let dir = directory + '\\' + o;
            return {
                name: dir,
                in: (fs.lstatSync(dir).isDirectory()) ? listDirectory(dir) : []
            }
        }, []);
};
/**
 * Remove pastas recursivamente utilizando o retorno da função "listDirectory".
 * @function removeDirectory
 * @param {object} directory
 * Contem:
 * - directory: Path completo da pasta
 * - in: Coleção de pastas e arquivos encontrados dentro da pasta
 */
function removeDirectory(directory) {
    if ((directory.in).length > 0) {
        (directory.in)
            .filter(function (o) {
                let isDirectory = true;
                if (!(fs.lstatSync(o.name).isDirectory())) {
                    fs.unlinkSync(o.name);
                    isDirectory = false;
                }
                return isDirectory;
            })
            .forEach(function (o) {
                return removeDirectory(o);
            });
    }
    return fs.rmdirSync(directory.name);
}
