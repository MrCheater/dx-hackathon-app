import nextRoutes from 'next-routes'

const routes = nextRoutes()
routes.add('PageIndex', '/')
routes.add('PageTodo', '/todo/:id')

export default routes
