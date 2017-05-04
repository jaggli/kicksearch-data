const { send } = require('../views/response')
const rawData = require('../data/questions.json')
const data = rawData.reduce((ret, item) => {
  ret[item.id] = { title: item.title, priority: item.priority, type: item.type }
  return ret
}, {})

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
