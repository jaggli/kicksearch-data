const {
  list: vehiclesList,
  coredata
} = require('./vehicles')

// definition of all root routes
const index = (req, res, next) => {
  res.render('index', { title: 'Frontend version server' })
}

// routes
const setupRoutes = app => {
  app.get('/', index)
  app.get('/api/v1', index)
  app.get('/api/v1/vehicles', vehiclesList)
  app.get('/api/v1/coredata', coredata)
}

module.exports = setupRoutes
