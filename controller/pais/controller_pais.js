/*************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento, manipulação
 *           de dados para realizar o CRUD de paises.
 * Autor: Gabriel
 * Versão: 1.0.17.4
 * Data: 17/04/26
 ************************************************************************************************************/

const daoPais = require('../../model/DAO/pais/pais.js');

const { mensagem } = require('../modulo/configMessages.js');
const { validar } = require('../../utils/validador.js');
const { tratar } = require('../../utils/tratamento.js');

const regras = {
    pais: { necessario: true, minimo: 1, maximo: 50, tipo: "string" }
};

const inserirPais = async function (pais, contentType) {

    try {
        let resultValidar = validar.DADOS(pais, regras, contentType);

        if (resultValidar == false) {
            let result = await daoPais.insertPais(tratar.DADOS(pais));

            if (result) {
                pais.id = result;

                return mensagem.SUCESSO_CRIAR_ITEM(pais);
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

const atualizarPais = async function (pais, id, contentType) {

    try {
        let resultValidar = validar.DADOS(pais, regras, contentType);

        if (resultValidar == false) {
            let resultBuscarPais = await buscarPais(id);

            if (resultBuscarPais.status == true) {
                pais.id = Number(id);

                let result = await daoPais.updatePais(tratar.DADOS(pais));

                if (result) {
                    return mensagem.SUCESSO_ATUALIZAR_ITEM(pais);
                } else {
                    return mensagem.ERRO_MODEL();
                }
            } else {
                return resultBuscarPais;
            }
        } else {
            return resultValidar;
        }
    } catch (error) {
        return mensagem.ERRO_CONTROLLER();
    }
};

const listarTodosPais = async function () {
    try {
        let result = await daoPais.getAllPais();

        if (result) {
            if (result.length > 0) {
                return mensagem.RETORNAR_ITENS_ENCONTRADOS(result, "pais");
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

const buscarPais = async function (id) {

    try {
        let resultValidarId = validar.ID(id);

        if (resultValidarId == false) {
            let result = await daoPais.getPaisById(id);

            if (result) {
                if (result.length > 0) {
                    return mensagem.RETORNAR_ITENS_ENCONTRADOS(result, "pais");
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

const deletePais = async function (id) {

    try {
        let resultBuscarPais = await buscarPais(id);

        if (resultBuscarPais.status == true) {
            let result = await daoPais.deletePais(id);

            if (result) {
                return mensagem.SUCESSO_DELETAR_ITEM();
            } else {
                return mensagem.ERRO_MODEL();
            }
        } else {
            return resultBuscarPais;
        }
    } catch (error) {
        return mensagem.ERRO_CONTROLLER();
    }
};

module.exports = {
    inserirPais,
    atualizarPais,
    listarTodosPais,
    buscarPais,
    deletePais
};