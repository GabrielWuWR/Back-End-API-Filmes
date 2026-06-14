const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const rotaBase = '/v1/senai/locadora/';
const porta = 8080;
const app = express();

const corsOptions = {
    origin: ['*'],
    methods: 'GET, POST, PUT, DELETE, OPTIONS',
    allowedHeaders: ['Content-type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

//ROTAS

const rotasClassificacao = require('./routes/classificacao/rotas_classificacao.js');
app.use(`${rotaBase}classificacao`, rotasClassificacao);

app.listen(porta, function () {
    console.log(`A api está funcioando em http://localhost:${porta}`);
});