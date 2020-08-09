/*dados base Professores*/
const proffys = []

/*Matérias*/
const subjects = [
    "Artes",
    "Biologia",
    "Ciências",
    "Educação física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Portugês",
    "Química",
]

/*Dias da Semana*/
const weekdays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
]

/*Funcionalidades*/
function getSubject(subjectNumber) {
    /*pega o numero da matéria e passa o valor do nome associado */
    const position = +subjectNumber - 1
    return subjects[position]
}

/*convert horas/minutos */
function convertHoursToMinutes(time) {
    const [hour, minutes] = time.split(":")
    return Number((hour * 60) + minutes)
}

//esportar dados base
module.exports = {
    subjects,
    weekdays,
    getSubject,
    convertHoursToMinutes
}