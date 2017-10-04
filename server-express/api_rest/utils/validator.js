/**
 * @file Gerador de mensagem de erro.
 * @author @douglaspands
 * @since 2017-07-04
 */
module.exports = function (context) {
    let errors = [];
    return {
        /**
         * Incluindo erros.
         * @function setError
         * @param {string} field Nome do campo que será tratado.
         * @param {any} value Valor dentro do campo.
         */
        setError: (field, value) => {
            let _field = field || 'NOT_FOUND';
            let _value = value || 'NOT_FOUND';
            return errors.push({
                message: (context.message('validator', { module: systemConfig.default.value })).replace(/({{propertie}})+/g, _field),
                value: _value
            });

        },
        /**
         * Obtendo erros.
         * @function getErrors
         * @returns {array} Lista de erros.
         */
        getErrors: () => errors
    };
};
