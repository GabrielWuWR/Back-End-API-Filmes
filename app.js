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

const rotasGenero = require('./routes/genero/rotas_genero.js');
app.use(`${rotaBase}genero`, rotasGenero);

const rotasStatusFilme = require('./routes/statusFilme/rotas_statusFilme.js');
app.use(`${rotaBase}statusFilme`, rotasStatusFilme);

const rotasTipoImagem = require('./routes/tipoImagem/rotas_tipoImagem.js');
app.use(`${rotaBase}tipoImagem`, rotasTipoImagem);

const rotasProdutora = require('./routes/produtora/rotas_produtora.js');
app.use(`${rotaBase}produtora`, rotasProdutora);

const rotasIdioma = require('./routes/idiomas/rotas_idioma.js');
app.use(`${rotaBase}idioma`, rotasIdioma);

const rotasPais = require('./routes/pais/rotas_pais.js');
app.use(`${rotaBase}pais`, rotasPais);

const rotasPremio = require('./routes/premio/rotas_premio.js');
app.use(`${rotaBase}premio`, rotasPremio);

app.listen(porta, function () {
    console.log(`A api está funcioando em http://localhost:${porta}`);
});