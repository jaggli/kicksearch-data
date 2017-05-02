const { list: listVehicles } = require('./vehicles')

// definition of all root routes
const index = (req, res, next) => {
  res.render('index', { title: 'Frontend version server' })
}

console.log(listVehicles)

// routes
const setupRoutes = app => {
  app.get('/', index)
  app.get('/api/v1', index)
  app.get('/api/v1/vehicles', listVehicles)
}

module.exports = setupRoutes
