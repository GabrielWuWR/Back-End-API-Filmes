const express = require('express');
const router = express.Router();

const controllerIdioma = require('../../controller/idiomas/controller_idiomas.js');

//Inserir novo idioma
router.post('/', async function (request, response) {
    let dados = request.body;

    let contentType = request.headers['content-type'];
    let result = await controllerIdioma.inserirIdioma(dados, contentType);

    response.status(result.status_code);
    response.json(result);
});

//Listar todos idiomas
router.get('/', async function (request, response) {
    let result = await controllerIdioma.listarTodosIdioma();

    response.status(result.status_code);
    response.json(result);
});

//Listar 1 idioma pelo id
router.get('/:id', async function (request, response) {
    let id = request.params.id;
    let result = await controllerIdioma.buscarIdioma(id);

    response.status(result.status_code);
    response.json(result);
});

//Atualizar 1 idioma
router.put('/:id', async function (request, response) {
    let contentType = request.headers['content-type'];
    let id = request.params.id;
    let dados = request.body;

    let result = await controllerIdioma.atualizarIdioma(dados, id, contentType);

    response.status(result.status_code);
    response.json(result);
});

//Deletar 1 idioma pelo id
router.delete('/:id', async function (request, response) {
    let id = request.params.id;

    let result = await controllerIdioma.deleteIdioma(id);

    response.status(result.status_code);
    response.json(result);
});

module.exports = router;