const { send } = require('../views/response')
const vehicles = require('../data/vehicles.json')

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
    }
  })
}
