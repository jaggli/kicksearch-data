const allQuestions = require('../../data/questions.json')
const agumentQuestions = require('./agumentQuestions')
const sortByPriority = (a, b) => {
  if (a.priority === b.priority) { return 0 }
  return a.priority > b.priority ? 1 : -1
}
const sortBySplitability = (a, b) => {
  // sort by splitability score
  // TODO
  return sortByPriority(a, b)
}

module.exports = (vehicles, query) => {
  const answered = Object.keys(query)
  let questions = allQuestions.slice()
    .filter(question => !answered.includes(question.id))
    // TODO: filter exclusion based on answers
    .sort(sortByPriority)

  if (!answered.length || (questions[0] && questions[0].type === 'numeric')) {
    return agumentQuestions(vehicles, questions.slice(0, 1))
      .shift()
  }

  return agumentQuestions(vehicles, questions)
    .sort(sortBySplitability)
    .shift() || null
}
