/*************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento, manipulação
 *           de dados para realizar o CRUD da tabela de produtoras.
 * Autor: Gabriel
 * Versão: 1.0.17.4
 * Data: 17/04/26
 ************************************************************************************************************/

const daoProdutora = require('../../model/DAO/produtora/produtora.js');

const { mensagem } = require('../modulo/configMessages.js');
const { validar } = require('../../UTILS/validador.js');
const { tratar } = require('../../UTILS/tratamento.js');

const regras = {
    nome: { necessario: true, minimo: 1, maximo: 150, tipo: "string" }
};

const inserirProdutora = async function (produtora, contentType) {

    try {
        let resultValidar = validar.DADOS(produtora, regras, contentType);

        if (resultValidar == false) {
            let result = await daoProdutora.insertProdutora(tratar.DADOS(produtora));

            if (result) {
                produtora.id = result;

                return mensagem.SUCESSO_CRIAR_ITEM(produtora);
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

const atualizarProdutora = async function (produtora, id, contentType) {

    try {
        let resultValidar = validar.DADOS(produtora, regras, contentType);

        if (resultValidar == false) {
            let resultBuscarProdutora = await buscarProdutora(id);

            if (resultBuscarProdutora.status == true) {
                produtora.id = Number(id);
                let result = await daoProdutora.updateProdutora(tratar.DADOS(produtora));

                if (result) {
                    return mensagem.SUCESSO_ATUALIZAR_ITEM(produtora);
                } else {
                    return mensagem.ERRO_MODEL();
                }
            } else {
                return resultBuscarProdutora;
            }
        } else {
            return resultValidar;
        }
    } catch (error) {
        return mensagem.ERRO_CONTROLLER();
    }
};

const listarTodosProdutora = async function () {
    try {
        let result = await daoProdutora.getAllProdutora();
        if (result) {
            if (result.length > 0) {
                return mensagem.RETORNAR_ITENS_ENCONTRADOS(result, "produtora");
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

const buscarProdutora = async function (id) {

    try {
        let resultValidarId = validar.ID(id);

        if (resultValidarId == false) {
            let result = await daoProdutora.getProdutoraById(id);

            if (result) {
                if (result.length > 0) {
                    return mensagem.RETORNAR_ITENS_ENCONTRADOS(result, "produtora");
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

const deleteProdutora = async function (id) {

    try {
        let resultBuscarProdutora = await buscarProdutora(id);

        if (resultBuscarProdutora.status == true) {
            let result = await daoProdutora.deleteProdutora(id);

            if (result) {
                return mensagem.SUCESSO_DELETAR_ITEM();
            } else {
                return mensagem.ERRO_MODEL();
            }
        } else {
            return resultBuscarProdutora;
        }
    } catch (error) {
        return mensagem.ERRO_CONTROLLER();
    }
};

module.exports = {
    inserirProdutora,
    atualizarProdutora,
    listarTodosProdutora,
    buscarProdutora,
    deleteProdutora
};