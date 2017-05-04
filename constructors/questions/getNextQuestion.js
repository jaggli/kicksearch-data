const allQuestions = require('../../data/questions.json')
const agumentQuestions = require('./agumentQuestions')
const sortByPriority = (a, b) => {
  if (a.priority === b.priority) { return 0 }
  return a.priority > b.priority ? 1 : -1
}

const getAgumentedQuestion = (vehicles, questions, start) => {
  start = start || 0
  if (!questions[start]) { return null }
  let question = agumentQuestions(vehicles, questions.slice(start, start + 1)).shift()

  if (question.answers.length < 2 || question.splitability < 0.25) {
    return getAgumentedQuestion(vehicles, questions, start + 1)
  }

  return question
}

module.exports = (vehicles, query) => {
  const answered = Object.keys(query)
  let questions = allQuestions.slice()
    .filter(question => !answered.includes(question.id))
    // TODO: filter exclusion based on answers
    .sort(sortByPriority)

  return getAgumentedQuestion(vehicles, questions)
}
