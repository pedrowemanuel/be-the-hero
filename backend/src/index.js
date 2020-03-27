const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const app = express(); 

//desenvolvimento:
app.use(cors());

//em produção:
//app.use(cors({
    //origin: 'http://meusite.com'
//}));

app.use(express.json());

app.use(routes);

app.listen(3333);