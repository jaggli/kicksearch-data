const allQuestions = require('../../data/questions.json')
const agumentQuestion = require('./agumentQuestion')
const sortByPriority = (a, b) => {
  // TODO: splitability score
  if (a.priority === b.priority) { return 0 }
  return a.priority > b.priority ? 1 : -1
}

module.exports = (vehicles, query) => {
  const answered = Object.keys(query)
  const question = allQuestions
    .filter(question => !answered.includes(question.id))
    // TODO: exclusion based on answers
    .map(question => agumentQuestion(vehicles, question))
    .sort(sortByPriority)
    .shift()
  return question || null
}
