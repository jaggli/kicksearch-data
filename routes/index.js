const routes = [
  'vehicles',
  'coredata'
]
const apiRoot = '/api/v1'

// definition of indes route
const index = (req, res, next) => {
  res.render('index', {
    title: 'Kicksearch REST API',
    apiRoot,
    routes
  })
}

// routes
const setupRoutes = app => {
  app.get('/', index)
  app.get(apiRoot, index)
  routes.forEach(name => {
    app.get(`${apiRoot}/${name}`, require(`./${name}`))
  })
}

module.exports = setupRoutes
