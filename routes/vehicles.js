const { send } = require('../views/response')
const vehicles = require('../data/vehicles.json')
const coredata = require('../data/coredata.json')
const { getNextQuestion } = require('../constructors/questions')
const { applyQuery } = require('../constructors/vehicleFilters')

const agumentVehicles = vehicles => vehicles.map(vehicle => {
  Object.keys(vehicle).forEach(key => {
    if (coredata[key] && vehicle[key]) {
      if (typeof vehicle[key] === 'number') {
        vehicle[key] = coredata[key][vehicle[key]]
      } else if (vehicle[key].map) {
        vehicle[key] = vehicle[key].map(id => coredata[key][id])
      }
    }
  })
  return vehicle
})

module.exports = (req, res, next) => {
  let data = vehicles
  const page = 1
  const perPage = 100

  // filtering
  data = applyQuery(data, req.query)
  const length = data.length

  // capping and agumenting
  data = data.slice(0, perPage)
  data = agumentVehicles(data)

  send(res, {
    meta: {
      length: length,
      page,
      perPage
    },
    next: getNextQuestion(data, req.query),
    list: data
  })
}
