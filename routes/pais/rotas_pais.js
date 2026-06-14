const express = require('express');
const router = express.Router();

const controllerPais = require('../../controller/pais/controller_pais.js');

router.post('/', async function (request, response) {
    let dados = request.body;

    let contentType = request.headers['content-type'];
    let result = await controllerPais.inserirPais(dados, contentType);

    response.status(result.status_code);
    response.json(result);
});

router.get('/', async function (request, response) {
    let result = await controllerPais.listarTodosPais();

    response.status(result.status_code);
    response.json(result);
});

router.get('/:id', async function (request, response) {
    let id = request.params.id;
    let result = await controllerPais.buscarPais(id);

    response.status(result.status_code);
    response.json(result);
});

router.put('/:id', async function (request, response) {
    let contentType = request.headers['content-type'];
    let id = request.params.id;
    let dados = request.body;

    let result = await controllerPais.atualizarPais(dados, id, contentType);

    response.status(result.status_code);
    response.json(result);
});

router.delete('/:id', async function (request, response) {
    let id = request.params.id;

    let result = await controllerPais.deletePais(id);

    response.status(result.status_code);
    response.json(result);
});

module.exports = router;