const { send } = require('../views/response')
const data = require('../data/filters.json')

module.exports = (req, res, next) => {
  send(res, data)
}
