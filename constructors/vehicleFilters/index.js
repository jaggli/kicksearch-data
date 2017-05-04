const questions = require('../../data/questions.json')
const distinct = require('./distinct')
const numeric = require('./numeric')

const noop = vehicles => vehicles

const filters = {
  autocomplete: distinct,
  distinct,
  numeric,
  boolean: noop,
  array: noop
}

const filterIdMap = questions.reduce((ret, item) => {
  ret[item.id] = filters[item.type](item.id)
  return ret
}, {})

module.exports = {
  applyQuery: (vehicles, query) => Object.keys(query || {})
    .reduce(
      (vehicles, id) => filterIdMap[id](vehicles, query[id]),
      vehicles
    )
}
