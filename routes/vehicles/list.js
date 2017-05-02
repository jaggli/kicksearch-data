const { send } = require('../../views/response')
const data = require('../../data/vehicles.json')
const dataMap = require('../../data/vehiclesMap.json')

module.exports = (req, res, next) => {
  send(res, {
    list: data.slice(0, 10),
    meta: dataMap
  })
}
