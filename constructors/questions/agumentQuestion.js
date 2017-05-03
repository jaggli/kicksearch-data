const coredata = require('../../data/coredata.json')
const distributors = require('./distributors')

const agumentQuestion = (vehicles, question) => {
  question = Object.assign({}, question)
  if (question.type === 'autocomplete' && question.answers === null) {
    var data = coredata[question.id]
    question.answers = Object.keys(data).map(key => ({
      title: data[key],
      value: key
    }))
  } else if (question.type === 'numeric') {
    const distribution = distributors.numeric(vehicles, question)
    question.answers = question.answers.map((answer, i) => {
      distribution.values[i].forEach(value => {
        answer.title = answer.title.replace('%d', value)
        answer.value = answer.value.replace('%d', value)
      })
      return answer
    })
  }
  return question
}

module.exports = agumentQuestion
