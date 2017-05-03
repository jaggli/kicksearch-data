const { send } = require('../views/response')
const data = require('../data/coredata.json')

module.exports = (req, res, next) => {
  send(res, data)
}
