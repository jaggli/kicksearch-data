const { send } = require('../views/response')
const vehicles = require('../data/vehicles.json')
const coredata = require('../data/coredata.json')
const { getNextQuestion } = require('../constructors/questions')
const { applyQuery } = require('../constructors/vehicleFilters')

const beginsWithHttp = /^https?:/i

const agumentVehicles = list => list.slice(0).map(vehicle => {
  var ret = {}
  Object.keys(vehicle).forEach(key => {
    if (key === 'Images' && vehicle[key]) {
      ret[key] = vehicle[key].replace(beginsWithHttp, '')
      return
    }
    if (!coredata[key] || !vehicle[key]) {
      ret[key] = vehicle[key]
      return
    }
    if (typeof vehicle[key] === 'number') {
      ret[key] = coredata[key][vehicle[key]]
    } else if (vehicle[key].map) {
      ret[key] = vehicle[key].map(id => coredata[key][id])
    } else {
      ret[key] = vehicle[key]
    }
  })
  return ret
})

module.exports = (req, res) => {
  let list = vehicles.slice(0)
  const page = 1
  const perPage = 100

  // filtering
  list = applyQuery(list, req.query)
  const meta = {
    length: list.length,
    page,
    perPage
  }

  // calculate next question
  const next = getNextQuestion(list, req.query)

  // capping and agumenting
  list = list.slice(0, perPage)
  list = agumentVehicles(list)

  send(res, {
    meta,
    next,
    list
  })
}
