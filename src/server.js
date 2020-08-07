// Chamo o ExpressJS que acabou de ser instalado ($ npm install express)
// Executo o server com ($ node src/server.js)
const express = require('express')
const server = express()

const { pageLanding, pageStudy, pageGiveClasses, saveClasses } = require('./pages')


// Configurar Nunjucks
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    express: server,
    noCache: true,
})





// Inicio e configuração do servidor
server
    // Receber os dados do req.body
    .use(express.urlencoded({ extended: true }))
    // Configurações das paginas estaticas (css, scripts, imagens)
    .use(express.static('public'))
    // Chamando as rotas
    .get('/', pageLanding)
    .get('/study', pageStudy)
    .get('/give-classes', pageGiveClasses)
    .post('/save-classes', saveClasses)
    // Escutando a porta localhost:5500
    .listen(5500)

// Em package.json, altero o script para ficar com o nodemon monitorando as mudanças ($ npm install nodemon -D)
/*
"scripts": {
    "dev": "nodemon src/server.js"
    },
*/