const questions = require('../../data/questions.json')
const distinct = require('./distinct')
const numeric = require('./numeric')

const noop = vehicles => vehicles

const typeHandler = {
  autocomplete: distinct,
  distinct,
  numeric,
  boolean: noop,
  array: noop
}

const filters = questions.reduce((ret, item) => {
  ret[item.id] = typeHandler[item.type]
  return ret
}, {})

module.exports = {
  applyQuery: (vehicles, query) => Object.keys(query || {})
    .reduce(
      (vehicles, id) => (filters[id] || noop)(vehicles, query[id]),
      vehicles
    )
}
