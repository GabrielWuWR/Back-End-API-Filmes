const express = require('express');
const router = express.Router();

const controllerGenero = require('../../controller/genero/generoController.js');

router.post('/', async function (request, response) {
    let dados = request.body;

    let contentType = request.headers['content-type'];

    let result = await controllerGenero.inserirNovoGenero(dados, contentType);

    response.status(result.status_code);
    response.json(result);
})

router.get('/', async function (request, response) {
    let result = await controllerGenero.listarTodosGeneros();

    response.status(result.status_code)
    response.json(result);
});

router.get('/:id', async function (request, response) {
    let id = request.params.id;

    let result = await controllerGenero.buscarGenero(id);

    response.status(result.status_code);
    response.json(result);
});

router.put('/:id', async function (request, response) {
    let dados = request.body;
    let id = request.params.id;
    let contentType = request.headers['content-type'];

    let result = await controllerGenero.atualizarGenero(dados, id, contentType);

    response.status(result.status_code);
    response.json(result);
});

router.delete('/:id', async function (request, response) {
    let id = request.params.id;

    let result = await controllerGenero.deletarGenero(id);

    response.status(result.status_code);
    response.json(result);
});

module.exports = router;