const { send } = require('../views/response')
const vehicles = require('../data/vehicles.json')
const { getQuestion } = require('../constructors/questions')
const { applyQuery } = require('../constructors/vehicleFilters')

module.exports = (req, res, next) => {
  let data = vehicles
  const page = 1
  const perPage = 100
  const nextQuestion = {
    id: 'MakeId'
  }

  data = applyQuery(data, req.query)

  // make filter
  if (req.query.MakeId) {
    nextQuestion.id = 'Price'
    nextQuestion.values = [
      [5000],
      [5000, 12000],
      [12000, 18000],
      [18000]
    ]
  }

  send(res, {
    meta: {
      length: data.length,
      page,
      perPage
    },
    next: getQuestion(nextQuestion),
    list: data.slice(0, perPage)
  })
}
