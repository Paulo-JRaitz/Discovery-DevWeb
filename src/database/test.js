const Database = require('./db');
const createProffy = require('./createProffy')

Database.then(async (db) => {
  proffyValue = {
    name: "Paulo Raitz",
    avatar: "https://avatars0.githubusercontent.com/u/69216941?s=460&u=b01fdb934929c4831d835b495099d3fc95bfc43e&v=4",
    whatsapp: "65984363024",
    bio: "Serei seu instrutor.",
  }

  classValue = {
    subject: 1,
    cost: "20",

  }

  classScheduleValues = [
    {
      weekday: 1,
      time_from: 720,
      time_to: 1220
    },
    {
      weekday: 0,
      time_from: 520,
      time_to: 1220
    }
  ]
  //await createProffy(db, { proffyValue, classValue, classScheduleValues })

  //Consult all
  const selectedProffys = await db.all("SELECT * FROM proffys")
  //console.log(selectedProffys)
  //consult class proffy especifico e dados do proffy
  const selectClassesAndProffys = await db.all(`
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE classes.proffy_id = 1
    `)
  //console.log(selectClassesAndProffys)

  //estruturando a consulta para apresentação de materia e proffys disponiveis entre periodos
  const selectClassesSchedules = await db.all(`
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = "1"
        AND class_schedule.weekday = "0"
        AND class_schedule.time_from<= "520"
        AND class_schedule.time_to > "520"
    `)
    //console.log(selectClassesSchedules)
})