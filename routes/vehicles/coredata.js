const { send } = require('../../views/response')
const data = require('../../data/vehiclesMap.json')

module.exports = (req, res, next) => {
  send(res, data)
}
