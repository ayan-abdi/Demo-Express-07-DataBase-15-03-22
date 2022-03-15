const express = require('express');

const homeRouter = require('./routes/home-router');
const messageRouter = require('./routes/message-router');
//  Chargement des variable d'environnement 
require('dotenv-flow').config();

//  Variable de config
// const port = 8080
// const mode = 'dev';  remplacer par la syntaxe suivante

const { PORT, NODE_ENV } = process.env 

// Génération du server
const app = express();


app.set('view engine', 'ejs');
app.set('views', './views');


app.use(homeRouter);
app.use(messageRouter);

// error 404 custom (Apres les routess)
app.use((req, res) => {
    res.status(404).send('Warning ☺')
})
// Lancement du server
app.listen(PORT, () => {
    console.log(`Kombinen in mijn server in ${PORT} ${NODE_ENV}`);
});