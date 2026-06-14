/*************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento, manipulação
 *           de dados para realizar o CRUD de idiomas.
 * Autor: Gabriel
 * Versão: 1.0.17.4
 * Data: 17/04/26
 ************************************************************************************************************/

const daoIdioma = require('../../model/DAO/idiomas/idiomas.js');

const { mensagem } = require('../modulo/configMessages.js');
const { validar } = require('../../UTILS/validador.js');
const { tratar } = require('../../UTILS/tratamento.js');

const regras = {
    idioma: { necessario: true, minimo: 1, maximo: 25, tipo: "string" },
    sigla: { necessario: true, minimo: 1, maximo: 5, tipo: "string" }
};

const inserirIdioma = async function (idioma, contentType) {

    try {
        let resultValidar = validar.DADOS(idioma, regras, contentType);

        if (resultValidar == false) {
            let result = await daoIdioma.insertIdioma(tratar.DADOS(idioma));

            if (result) {
                idioma.id = result;

                return mensagem.SUCESSO_CRIAR_ITEM(idioma);
            } else {
                return mensagem.ERRO_MODEL();
            };

        } else {
            return resultValidar;
        }
    } catch (error) {
        return mensagem.ERRO_CONTROLLER();
    };
};

const atualizarIdioma = async function (idioma, id, contentType) {

    try {
        let resultValidar = validar.DADOS(idioma, regras, contentType);

        if (resultValidar == false) {
            let resultBuscarIdioma = await buscarIdioma(id);

            if (resultBuscarIdioma.status == true) {
                idioma.id = Number(id);

                let result = await daoIdioma.updateIdioma(tratar.DADOS(idioma));

                if (result) {
                    return mensagem.SUCESSO_ATUALIZAR_ITEM(idioma);
                } else {
                    return mensagem.ERRO_MODEL();
                }
            } else {
                return resultBuscarIdioma;
            }
        } else {
            return resultValidar;
        }
    } catch (error) {
        return mensagem.ERRO_CONTROLLER();
    }
};

const listarTodosIdioma = async function () {
    try {
        let result = await daoIdioma.getAllIdioma();

        if (result) {
            if (result.length > 0) {
                return mensagem.RETORNAR_ITENS_ENCONTRADOS(result, "idioma");
            } else {
                return mensagem.ERRO_NADA_ENCONTRADO();
            }
        } else {
            return mensagem.ERRO_MODEL()
        }
    } catch (error) {
        return mensagem.ERRO_CONTROLLER()
    }
};

const buscarIdioma = async function (id) {

    try {
        let resultValidarId = validar.ID(id);

        if (resultValidarId == false) {
            let result = await daoIdioma.getIdiomaById(id);

            if (result) {
                if (result.length > 0) {
                    return mensagem.RETORNAR_ITENS_ENCONTRADOS(result, "idioma");
                } else {
                    return mensagem.ERRO_NADA_ENCONTRADO();
                }
            } else {
                return mensagem.ERRO_MODEL();
            }
        } else {
            return resultValidarId;
        }
    } catch (error) {
        return mensagem.ERRO_CONTROLLER();
    }
};

const deleteIdioma = async function (id) {

    try {
        let resultBuscarIdioma = await buscarIdioma(id);

        if (resultBuscarIdioma.status == true) {
            let result = await daoIdioma.deleteIdioma(id);

            if (result) {
                return mensagem.SUCESSO_DELETAR_ITEM();
            } else {
                return mensagem.ERRO_MODEL();
            }
        } else {
            return resultBuscarIdioma;
        }
    } catch (error) {
        return mensagem.ERRO_CONTROLLER();
    }
};

module.exports = {
    inserirIdioma,
    atualizarIdioma,
    listarTodosIdioma,
    buscarIdioma,
    deleteIdioma
};