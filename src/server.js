const proffys = [
    {
        name: 'Rafael Simionato',
        avatar: 'https://avatars2.githubusercontent.com/u/32374173?s=460&u=258cef4fd54c501227706412a4eff91a13809dd5&v=4',
        whatsapp: '1999999999',
        bio: 'Estusiasta das melhores tecnologias de química avançada. <br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.',
        subject: 'Química',
        cost: '20',
        weekday: [0],
        time_from: [720],
        time_to: [1220],
    },
    {
        name: 'Daniele Evangelista',
        avatar: 'https://avatars2.githubusercontent.com/u/32374173?s=460&u=258cef4fd54c501227706412a4eff91a13809dd5&v=4',
        whatsapp: '1999999999',
        bio: 'Estusiasta das melhores tecnologias de química avançada. <br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.',
        subject: 'Química',
        cost: '20',
        weekday: [1],
        time_from: [720],
        time_to: [1220],
    }
]

const subjects = [
    "Artes",
    "Biologia",
    "Ciências",
    "Educação Física",
    "Física",
    "Geografia",
    "História",
    "Informática",
    "Matemática",
    "Português",
    "Química",
]

const weekdays = [
    "Domingo",
    "Segunda-Feira",
    "Terça-Feira",
    "Quarta-Feira",
    "Quinta-Feira",
    "Sexta-Feira",
    "Sábado",
]


// Funcionalidades
function getSubject(subjectNumber) {
    const arrayPosition = +subjectNumber - 1
    return subjects[arrayPosition]
}

// Funções criando as rotas das paginas
function pageLanding(req, res) {
    return res.render('index.html')
}

function pageStudy(req, res) {
    const filters = req.query
    return res.render('study.html', { proffys, filters, subjects, weekdays })
}

function pageGiveClasses(req, res) {
    const data = req.query

    // Transformando as chaves em um Array [name, avatar, bio]
    const isNotEmpty = Object.keys(data).length > 0

    // Adicionar dados a lista de proffys (Se houver Dados)
    if (isNotEmpty) {

        data.subject = getSubject(data.subject)
        proffys.push(data)
        
        return res.redirect('/study')
    }
    
    // Se não houver, mostrar a pagina
    return res.render('give-classes.html', { subjects, weekdays })
}

// Chamo o ExpressJS que acabou de ser instalado ($ npm install express)
// Executo o server com ($ node src/server.js)
const express = require('express')
const server = express()


// Configurar Nunjucks
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    express: server,
    noCache: true,
})


// Pego as páginas estaticas (CSS, Scripts, Imagens) localizadas no public
server.use(express.static('public'))

    // Chamando as rotas
    .get('/', pageLanding)
    .get('/study', pageStudy)
    .get('/give-classes', pageGiveClasses)
    // Escutando a porta localhost:5500
    .listen(5500)

// Em package.json, altero o script para ficar com o nodemon monitorando as mudanças ($ npm install nodemon -D)
/*
"scripts": {
    "dev": "nodemon src/server.js"
    },
*/