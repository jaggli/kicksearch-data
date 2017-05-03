const questions = require('../../data/questions.json')
const coredata = require('../../data/coredata.json')

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

module.exports = getQuestion
