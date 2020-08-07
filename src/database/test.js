const Database = require('./db')
const createProffy = require('./createProffy')

Database.then(async (db) => {

    // Inserir dados
    proffyValue = {
        name: 'Rafael Simionato',
        avatar: 'https://avatars2.githubusercontent.com/u/32374173?s=460&u=258cef4fd54c501227706412a4eff91a13809dd5&v=4',
        whatsapp: '1999999999',
        bio: 'Estusiasta das melhores tecnologias de química avançada. <br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.',
    }

    classValue = {
        subject: 1,
        cost: '20',
        // proffy_id virá do Banco de Dados
    }

    classScheduleValues = [
        {
            // class_id virá do Banco de Dados
            weekday: 1,
            time_from: 720,
            time_to: 1220
        },
        {
            weekday: 0,
            time_from: 520,
            time_to: 1220
        },
    ]

    // await createProffy(db, {proffyValue, classValue, classScheduleValues})

    // Consultar dados inseridos
    // Todos os proffys
    const selectedproffys = await db.all("SELECT * FROM proffys")
    //console.log(selectedproffys);

    // Todas as class de um determinado professor + dados do professor
    const selectedClassesAndProffys = await db.all(`
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE classes.proffy_id = 1;
    `)
    //console.log(selectedClassesAndProffys);

    // Horario de trabalho Ex: 8h - 18h
    // O time_from (8h) precisa ser menor ou igual ao horario solicitado
    // O time_to precisa ser acima
    const selectedClassesSchedules = await db.all(`
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = "1"
        AND class_schedule.weekday = "0"
        AND class_schedule.time_from <= "520"
        AND class_schedule.time_to > "520"
    `)
    //console.log(selectedClassesSchedules);
})