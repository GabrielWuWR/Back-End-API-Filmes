/*************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento, manipulação
 *           de dados para realizar o CRUD de generos.
 * Autor: Gabriel
 * Versão: 1.0.17.4
 * Data: 17/04/26
 ************************************************************************************************************/

const { mensagem } = require('../modulo/configMessages.js');
const generoDAO = require('../../model/DAO/genero/genero.js');

const { validar } = require('../../utils/validador.js');
const { tratar } = require('../../utils/tratamento.js');

const regras = {
    genero: { necessario: true, minimo: 1, maximo: 30, tipo: "string" }
}

const inserirNovoGenero = async function (genero, contentType) {

    try {
        let resultValidar = validar.DADOS(genero, regras, contentType);

        if (resultValidar == false) {
            let result = await generoDAO.insertGenero(tratar.DADOS(genero));

            if (result) {
                genero.id = result;
                return mensagem.SUCESSO_CRIAR_ITEM(genero);
            } else {
                return mensagem.ERRO_MODEL();
            }
        } else {
            return resultValidar;
        }
    } catch (error) {
        return mensagem.ERRO_CONTROLLER();
    }
};

const atualizarGenero = async function (genero, id, contentType) {

    try {
        let resultValidar = validar.DADOS(genero, regras, contentType);

        if (resultValidar == false) {

            let resultBuscarGenero = await buscarGenero(id);

            if (resultBuscarGenero.status == true) {
                genero.id = Number(id);

                let result = await generoDAO.updateGenero(tratar.DADOS(genero));

                if (result) {
                    return mensagem.SUCESSO_ATUALIZAR_ITEM(genero);
                } else {
                    return mensagem.ERRO_MODEL();
                }
            } else {
                return resultBuscarGenero;
            }
        } else {
            return resultValidar;
        }

    } catch (error) {
        return mensagem.ERRO_CONTROLLER();
    }
};

const listarTodosGeneros = async function () {

    try {
        let result = await generoDAO.selectAllGenero();

        if (result) {
            if (result.length > 0) {
                return mensagem.RETORNAR_ITENS_ENCONTRADOS(result, "genero")
            } else {
                return mensagem.ERRO_NADA_ENCONTRADO();
            }
        } else {
            return mensagem.ERRO_MODEL();
        }
    } catch (error) {
        return mensagem.ERRO_CONTROLLER();
    }
};

const buscarGenero = async function (id) {

    try {
        let resultValidarId = validar.ID(id);

        if (resultValidarId == false) {
            let result = await generoDAO.selectByIdGenero(id);

            if (result) {
                if (result.length > 0) {
                    return mensagem.RETORNAR_ITENS_ENCONTRADOS(result, "genero");
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

const deletarGenero = async function (id) {

    try {
        let resultBuscarGenero = await buscarGenero(id);

        if (resultBuscarGenero.status) {
            let resultValidarId = validar.ID(id);

            if (resultValidarId == false) {
                let result = await generoDAO.deleteGenero(id);

                if (result) {
                    return mensagem.SUCESSO_DELETAR_ITEM();
                } else {
                    return mensagem.ERRO_MODEL();
                }
            } else {
                return resultValidarId;
            }
        } else {
            return resultBuscarGenero;
        }
    } catch (error) {
        return mensagem.ERRO_CONTROLLER();
    }
};

module.exports = {
    inserirNovoGenero,
    atualizarGenero,
    listarTodosGeneros,
    buscarGenero,
    deletarGenero
};