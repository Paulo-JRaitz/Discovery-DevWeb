/*servidor */
const express = require('express');
const server = express();

/*inport do modulo pages */
const { pageLanding, pageStudy, pageGiveClasses, saveClasses } = require('./pages')

/*Configuração do template engine (nunjucks) */
const nunjucks = require('nunjucks');
nunjucks.configure('src/views', {
    express: server,
    noCache: true,
})

server
    .use(express.urlencoded({extended: true}))
    .use(express.static("public"))
    .get("/", pageLanding)
    .get("/study", pageStudy)
    .get("/give-classes", pageGiveClasses)
    .post("/save-classes", saveClasses)
    .listen(5500);