const { send } = require('../views/response')
const vehicles = require('../data/vehicles.json')
const questions = require('../data/questions.json')

const getQuestion = id => questions.filter(question => question.id === id).pop()
const fillAnswers = (id, values) => {
  const question = Object.assign({}, getQuestion(id))
  question.answers = question.answers.map((answer, i) => {
    values[i].forEach(value => {
      answer.desc = answer.desc.replace('%d', value)
      answer.value = answer.value.replace('%d', value)
    })
    return answer
  })
  return question
}

module.exports = (req, res, next) => {
  let data = vehicles
  const page = 1
  const perPage = 100

  // make filter
  if (req.query.MakeId) {
    var make = parseInt(req.query.MakeId, 10)
    data = data.filter(vehicle => vehicle.MakeId === make)
  }

  send(res, {
    list: data.slice(0, perPage),
    meta: {
      length: data.length,
      page,
      perPage
    },
    next: fillAnswers('Price', [
      [5000],
      [5000, 12000],
      [12000, 18000],
      [18000]
    ])
  })
}