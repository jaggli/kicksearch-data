const { send } = require('../views/response')
const vehicles = require('../data/vehicles.json')
const { getNextQuestion } = require('../constructors/questions')
const { applyQuery } = require('../constructors/vehicleFilters')

module.exports = (req, res, next) => {
  let data = vehicles
  const page = 1
  const perPage = 100

  data = applyQuery(data, req.query)

  // nextQuestion.id = 'Price'
  // nextQuestion.values = [
  //   [5000],
  //   [5000, 12000],
  //   [12000, 18000],
  //   [18000]
  // ]

  send(res, {
    meta: {
      length: data.length,
      page,
      perPage
    },
    next: getNextQuestion(data, req.query),
    list: data.slice(0, perPage)
  })
}
