const express = require('express');
const router = express.Router();

const controllerStatusFilme = require('../../controller/statusFilme/controller_statusFilme.js');

router.post('/', async function (request, response) {
    let dados = request.body;

    let contentType = request.headers['content-type'];
    let result = await controllerStatusFilme.inserirNovoStatusFilme(dados, contentType);

    response.status(result.status_code);
    response.json(result);
});

router.get('/', async function (request, response) {
    let result = await controllerStatusFilme.obterTodosStatusFilme();

    response.status(result.status_code);
    response.json(result);
});

router.get('/:id', async function (request, response) {
    let id = request.params.id;
    let result = await controllerStatusFilme.buscarStatusFilme(id);

    response.status(result.status_code);
    response.json(result);
});

router.put('/:id', async function (request, response) {
    let contentType = request.headers['content-type'];
    let id = request.params.id;
    let dados = request.body;

    let result = await controllerStatusFilme.atualizarStatusFilme(dados, id, contentType);

    response.status(result.status_code);
    response.json(result);
});

router.delete('/:id', async function (request, response) {
    let id = request.params.id;

    let result = await controllerStatusFilme.deletarStatusFilme(id);

    response.status(result.status_code);
    response.json(result);
});

module.exports = router;