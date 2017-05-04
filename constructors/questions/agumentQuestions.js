const coredata = require('../../data/coredata.json')
const distributors = require('./distributors')
const noop = () => null

const agumentQuestions = (vehicles, questions) => {
  const idsByType = questions.reduce((dict, question) => {
    dict[question.type] = dict[question.type] || []
    dict[question.type].push(question.id)
    return dict
  }, {})
  const distributions = {}
  Object.keys(idsByType).forEach(key => {
    distributions[key] = (distributors[key] || noop)(vehicles, idsByType[key])
  })

  questions = questions.map(question => {
    question = Object.assign({}, question)
    if (question.type === 'autocomplete' && question.answers === null) {
      var data = coredata[question.id]
      question.answers = Object.keys(data).map(key => ({
        title: data[key],
        value: key
      }))
    } else if (question.type === 'numeric') {
      const questionDistributions = distributions['numeric'][question.id].values
      const possibleAnswers = question.answers
      question.answers = questionDistributions.map(distribution => {
        let answer = Object.assign({}, possibleAnswers[distribution.type])
        distribution.values.forEach(value => {
          answer.title = answer.title.replace('%d', value)
          answer.value = answer.value.replace('%d', value)
        })
        return answer
      })
      question.splitability = distributions['numeric'][question.id].splitability

      if (possibleAnswers.images) {
        question.answers = question.answers.map((answer, i) => {
          answer.image = '//kicksearch-data.herokuapp.com/icons/' + question.id + '/' + (i + 1) + '.png'
          return answer
        })
      }
    }
    return question
  })

  return questions
}

module.exports = agumentQuestions
