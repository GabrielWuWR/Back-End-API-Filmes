/*************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento, manipulação
 *           de dados para realizar o CRUD de status do filme.
 * Autor: Gabriel
 * Versão: 1.0.17.4
 * Data: 17/04/26
 ************************************************************************************************************/

const configMessages = require('../modulo/configMessages.js');
const statusFilmeDAO = require('../../model/DAO/statusFilme/statusFilme.js');

const { mensagem } = require('../modulo/configMessages.js');
const { validar } = require('../../utils/validador.js');
const { tratar } = require('../../utils/tratamento.js');

const regras = {
    status: { necessario: true, tipo: "string", minimo: 1, maximo: 20 }
};

const inserirNovoStatusFilme = async function (statusFilme, contentType) {

    try {
        let resultValidar = validar.DADOS(statusFilme, regras, contentType);

        if (resultValidar == false) {
            let result = await statusFilmeDAO.insertStatusFilme(tratar.DADOS(statusFilme));

            if (result) {
                statusFilme.id = result;

                return mensagem.SUCESSO_CRIAR_ITEM(statusFilme);
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

const atualizarStatusFilme = async function (statusFilme, id, contentType) {

    try {
        let resultValidar = validar.DADOS(statusFilme, regras, contentType);

        if (resultValidar == false) {
            let resultBuscarStatus = await buscarStatusFilme(id);

            if (resultBuscarStatus.status == true) {
                statusFilme.id = Number(id);

                let result = await statusFilmeDAO.updateStatusFilme(tratar.DADOS(statusFilme));

                if(result) {
                    return mensagem.SUCESSO_ATUALIZAR_ITEM(statusFilme);
                } else {
                    return mensagem.ERRO_MODEL();
                }
            } else {
                return resultBuscarStatus;
            }
        } else {
            return resultValidar;
        }
    } catch (error) {
        return mensagem.ERRO_CONTROLLER();
    }
};

const obterTodosStatusFilme = async function () {

    try {
        let result = await statusFilmeDAO.selectAllStatusFilme();

        if (result) {
            if (result.length > 0) {
                return mensagem.RETORNAR_ITENS_ENCONTRADOS(result, "statusFilme");
            } else {
                return mensagem.ERRO_NADA_ENCONTRADO();
            }
        } else {
            return mensagem.ERRO_MODEL()
        }
    } catch (error) {
        return mensagem.ERRO_CONTROLLER();
    }
};

const buscarStatusFilme = async function (id) {

    try {
        let resultValidarId = validar.ID(id);

        if (resultValidarId == false) {
            let result = await statusFilmeDAO.selectStatusFilmeById(id);

            if(result.length > 0) {
                if (result) {
                    return mensagem.RETORNAR_ITENS_ENCONTRADOS(result, "statusFilme");
                } else {
                    return mensagem.ERRO_MODEL();
                }
            } else {
                return mensagem.ERRO_NADA_ENCONTRADO();
            }
        } else {
            return resultValidarId;
        }
    } catch (error) {
        return mensagem.ERRO_CONTROLLER();
    }
};

const deletarStatusFilme = async function (id) {

    try {
        let resultBuscarStatus = await buscarStatusFilme(id);

        if (resultBuscarStatus.status == true) {
            let result = await statusFilmeDAO.deleteStatusFilme(id);

            if (result) {
                return mensagem.SUCESSO_DELETAR_ITEM();
            } else {
                return mensagem.ERRO_MODEL();
            }
        } else {
            return resultBuscarStatus;
        }
    } catch (error) {
        return mensagem.ERRO_CONTROLLER();
    }
};

module.exports = {
    inserirNovoStatusFilme,
    atualizarStatusFilme,
    obterTodosStatusFilme,
    buscarStatusFilme,
    deletarStatusFilme
};