/*************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento, manipulação
 *           de dados para realizar o CRUD da tabela de tipos de imagem.
 * Autor: Gabriel
 * Versão: 1.0.17.4
 * Data: 17/04/26
 ************************************************************************************************************/

const configMessages = require('../modulo/configMessages.js');
const daoTipoImagem = require('../../model/DAO/tipoImagem/tipoImagem.js');

const { mensagem } = require('../modulo/configMessages.js');
const { validar } = require('../../utils/validador.js');
const { tratar } = require('../../utils/tratamento.js');

const regras = {
    tipo: { necessario: true, minimo: 1, maximo: 30, tipo: "string" }
};

const inserirTipoImagem = async function (tipoImagem, contentType) {

    try {
        let resultValidar = validar.DADOS(tipoImagem, regras, contentType);

        if (resultValidar == false) {
            let result = await daoTipoImagem.insertTipoImagem(tratar.DADOS(tipoImagem));

            if (result) {
                tipoImagem.id = result;

                return mensagem.SUCESSO_CRIAR_ITEM(tipoImagem);
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

const atualizarTipoImagem = async function (tipoImagem, id, contentType) {

    try {
        let resultValidar = validar.DADOS(tipoImagem, regras, contentType);

        if (resultValidar == false) {
            let resultBuscarTipoImagem = await buscarTipoImagem(id);

            if (resultBuscarTipoImagem.status == true) {
                tipoImagem.id = Number(id);

                let result = await daoTipoImagem.updateTipoImagem(tratar.DADOS(tipoImagem));

                if (result) {
                    return mensagem.SUCESSO_ATUALIZAR_ITEM(tipoImagem);
                } else {
                    return mensagem.ERRO_MODEL();
                }
            } else {
                return resultBuscarTipoImagem;
            }
        } else {
            return resultValidar;
        }
    } catch (error) {
        return mensagem.ERRO_CONTROLLER();
    }
};

const listarTodosTipoImagem = async function () {
    try {
        let result = await daoTipoImagem.getAllTipoImagem();
        if (result) {
            if (result.length > 0) {
                return mensagem.RETORNAR_ITENS_ENCONTRADOS(result, "tipoimagem");
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

const buscarTipoImagem = async function (id) {

    try {
        let resultValidarId = validar.ID(id);

        if (resultValidarId == false) {
            let result = await daoTipoImagem.getTipoImagemById(id);

            if (result) {
                if (result.length > 0) {
                    return mensagem.RETORNAR_ITENS_ENCONTRADOS(result, "tipoimagem");
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

const deleteTipoImagem = async function (id) {

    try {
        let resultBuscarTipoImagem = await buscarTipoImagem(id);

        if (resultBuscarTipoImagem.status == true) {
            let result = await daoTipoImagem.deleteTipoImagem(id);

            if (result) {
                return mensagem.SUCESSO_DELETAR_ITEM();
            } else {
                return mensagem.ERRO_MODEL();
            }
        } else {
            return resultBuscarTipoImagem;
        }
    } catch (error) {
        return mensagem.ERRO_CONTROLLER();
    }
};

module.exports = {
    inserirTipoImagem,
    atualizarTipoImagem,
    listarTodosTipoImagem,
    buscarTipoImagem,
    deleteTipoImagem
};