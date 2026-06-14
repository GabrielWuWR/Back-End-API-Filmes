/*************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento, manipulação
 *           de dados para realizar o CRUD de classificacao.
 * Autor: Gabriel
 * Versão: 1.0.17.4
 * Data: 17/04/26
 ************************************************************************************************************/

const { mensagem } = require('../modulo/configMessages.js');
const classificacaoDAO = require('../../model/DAO/classificacao/classificacao.js');

const { validar } = require('../../UTILS/validador.js');
const { tratar } = require('../../UTILS/tratamento.js');

const regras = {
    classificacao: { necessario: true, minimo: 1, tipo: "numero" },
    informacao_classificacao: { necessario: true, tipo: "string" }
}

const inserirNovaClassificacao = async function (classificacao, contentType) {
    try {
        let resultValidar = validar.DADOS(classificacao, regras, contentType);

        if (resultValidar == false) {
            let result = await classificacaoDAO.insertClassificacao(tratar.DADOS(classificacao));

            if (result) {
                classificacao.id = result;

                return mensagem.SUCESSO_CRIAR_ITEM(classificacao);
            } else {
                return mensagem.ERRO_MODEL();
            };
        } else {
            return resultValidar;
        };

    } catch (error) {
        return mensagem.ERRO_CONTROLLER();
    };
};

const atualizarClassificacao = async function (classificacao, id, contentType) {

    try {
        let resultValidar = validar.DADOS(classificacao, regras, contentType);

        if (resultValidar == false) {
            let resultBuscarClassificacao = await buscarClassificacao(id);

            if (resultBuscarClassificacao.status == true) {
                classificacao.id = id;

                let resultId = validar.ID(id);

                if (resultId == false) {
                    let result = await classificacaoDAO.updateClassificacao(tratar.DADOS(classificacao));

                    if (result) {
                        return mensagem.SUCESSO_ATUALIZAR_ITEM(classificacao);
                    } else {
                        return mensagem.ERRO_MODEL();
                    }
                } else {
                    return resultId;
                }

            } else {
                return resultBuscarClassificacao;
            }
        } else {
            return resultValidar;
        }
    } catch (error) {
        return mensagem.ERRO_CONTROLLER();
    }
}

const listarClassificacao = async function () {

    try {
        let result = await classificacaoDAO.selectAllClassificacao();

        if (result) {
            if (result.length > 0) {
                return mensagem.RETORNAR_ITENS_ENCONTRADOS(result, "classificacao");
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

const buscarClassificacao = async function (id) {

    try {
        let resultValidar = validar.ID(Number(id));

        if (resultValidar == false) {
            let result = await classificacaoDAO.selectByIdClassificacao(id);

            if (result) {
                if (result.length > 0) {
                    return mensagem.RETORNAR_ITENS_ENCONTRADOS(result, 'classificacao');
                } else {
                    return mensagem.ERRO_NADA_ENCONTRADO();
                }
            } else {
                return mensagem.ERRO_MODEL();
            }
        } else {
            return mensagem.REQUISICAO_INVALIDA('id');
        }
    } catch (error) {
        return mensagem.ERRO_CONTROLLER();
    }
}

const excluirClassificacao = async function (id) {

    try {
        let resultBuscarClassificacao = await buscarClassificacao(id);

        if (resultBuscarClassificacao.status) {
            let result = await classificacaoDAO.deleteClassificacao(id);

            if (result) {
                return mensagem.SUCESSO_DELETAR_ITEM();
            } else {
                return mensagem.ERRO_MODEL();
            };

        } else {
            return resultBuscarClassificacao;
        };

    } catch (error) {
        return mensagem.ERRO_CONTROLLER();
    };
};

module.exports = {
    inserirNovaClassificacao,
    buscarClassificacao,
    atualizarClassificacao,
    listarClassificacao,
    excluirClassificacao,
};