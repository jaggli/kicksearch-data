const { send } = require('../views/response')
const vehicles = require('../data/vehicles.json')
const questions = require('../data/questions.json')
const coredata = require('../data/coredata.json')

const getQuestion = stub => {
  const question = Object.assign({}, questions.filter(question => question.id === stub.id).pop())
  if (question.type === 'autocomplete' && question.answers === null) {
    var data = coredata[question.id]
    question.answers = Object.keys(data).map(key => ({
      title: data[key],
      value: key
    }))
  } else if (question.type === 'numeric') {
    question.answers = question.answers.map((answer, i) => {
      stub.values[i].forEach(value => {
        answer.desc = answer.desc.replace('%d', value)
        answer.value = answer.value.replace('%d', value)
      })
      return answer
    })
  }
  return question
}

module.exports = (req, res, next) => {
  let data = vehicles
  const page = 1
  const perPage = 100
  const nextQuestion = {
    id: 'MakeId'
  }

  // make filter
  if (req.query.MakeId) {
    var make = parseInt(req.query.MakeId, 10)
    data = data.filter(vehicle => vehicle.MakeId === make)
    nextQuestion.id = 'Price'
    nextQuestion.values = [
      [5000],
      [5000, 12000],
      [12000, 18000],
      [18000]
    ]
  }

  send(res, {
    list: data.slice(0, perPage),
    meta: {
      length: data.length,
      page,
      perPage
    },
    next: getQuestion(nextQuestion)
  })
}
