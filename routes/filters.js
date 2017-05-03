const { send } = require('../views/response')
const data = require('../data/filters.json')

module.exports = (req, res, next) => {
  let ret = {}
  const filter = req.query.filter || ''
  let found = false
  filter.split(',').forEach(key => {
    if (!data[key]) { return }
    found = true
    ret[key] = data[key]
  })
  if (!found) { ret = data }
  send(res, ret)
}
