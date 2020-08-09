/*inportar database */
const Database = require('./database/db')
/*inportar dados base */
const { subjects, weekdays, getSubject, convertHoursToMinutes } = require('./utils/format')

/*Apresentação da página inicial */
function pageLanding(req, res) {
    return res.render("index.html")
}

/*Pagina do estudante */
async function pageStudy(req, res) {
    /*console.log(req.query)*/
    const filters = req.query
    if (!filters.subject || !filters.weekday || !filters.time) {

        return res.render("study.html", { filters, subjects, weekdays })
    }

    /*usar o conversor de horas/mibutos */
    const timeToMinutes = convertHoursToMinutes(filters.time)

    /*Parametros de busca */
    const query = `
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE EXISTS (
            SELECT class_schedule.*
            FROM class_schedule
            WHERE class_schedule.class_id = classes.id
            AND class_schedule.weekday = ${filters.weekday}
            AND class_schedule.time_from<= ${timeToMinutes}
            AND class_schedule.time_to > ${timeToMinutes} 
        )
        AND classes.subject = '${filters.subject}'
    `

    /*captura de erros */
    try {
        const db = await Database
        const proffys = await db.all(query)
        

        /*converte numero da materia pelo nome da matéria */
        proffys.map((proffy) => {
            proffy.subject = getSubject(proffy.subject)
        })

        return res.render('study.html', { proffys, subjects, filters, weekdays })

    } catch (error) {
        console.log(error)
    }

    /*return res.render("study.html", {
        proffys, filters, subjects, weekdays
    })*/
}

/*página dos professores */
function pageGiveClasses(req, res) {
 
    /*se nada for digitado atualiza a página */
    return res.render("give-classes.html", {
        subjects, weekdays
    })
}

async function saveClasses(req, res){
    const createProffy = require('./database/createProffy')

    const proffyValue = {
        name: req.body.name,
        avatar: req.body.avatar,
        whatsapp: req.body.whatsapp,
        bio: req.body.bio
    }
    
    const classValue = {
        subject: req.body.subject,
        cost: req.body.cost
    }

    const classScheduleValues = req.body.weekday.map((weekday, index) => {
        return{
            weekday,
            time_from: convertHoursToMinutes(req.body.time_from[index]),
            time_to: convertHoursToMinutes(req.body.time_to[index])
        }
    })

    try {

        const db = await Database
        await createProffy(db, {proffyValue, classValue, classScheduleValues})
        /*retorna valores recentemente cadastrados */
        let queryString = "?subject=" + req.body.subject
        queryString += "&weekday=" + req.body.weekday[0]
        queryString += "&time=" + req.body.time_from[0]

        return res.redirect("/study" + queryString)
    
    } catch (error) {
        console.log(error)
    }

}

/*exportar o modulo pages */
module.exports = {
    pageLanding,
    pageStudy,
    pageGiveClasses,
    saveClasses
}