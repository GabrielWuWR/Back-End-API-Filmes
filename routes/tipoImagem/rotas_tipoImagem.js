const express = require('express');
const router = express.Router();

const controllerTipoImagem = require('../../controller/tipoImagem/controller_tipoImagem.js');

//EndPoints Tipo Imagem
router.post('/', async function (request, response) {
    let dados = request.body;
    let contentType = request.headers['content-type'];

    let result = await controllerTipoImagem.inserirTipoImagem(dados, contentType);

    response.status(result.status_code);
    response.json(result)
});

router.get('/', async function (request, response) {
    let result = await controllerTipoImagem.listarTodosTipoImagem();

    response.status(result.status_code);
    response.json(result);
});

router.get('/:id', async function (request, response) {
    let id = request.params.id;
    let result = await controllerTipoImagem.buscarTipoImagem(id);

    response.status(result.status_code);
    response.json(result);
});

router.put('/:id', async function (request, response) {
    let id = request.params.id;
    let dados = request.body;
    let contentType = request.headers['content-type'];

    let result = await controllerTipoImagem.atualizarTipoImagem(dados, id, contentType);

    response.status(result.status_code);
    response.json(result);
});

router.delete('/:id', async function (request, response) {
    let id = request.params.id;

    let result = await controllerTipoImagem.deleteTipoImagem(id);

    response.status(result.status_code);
    response.json(result);
});

module.exports = router;