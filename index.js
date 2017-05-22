import jwt from 'jsonwebtoken'
import routes from './routes'
import webAPI from './resolve/packages/resolve-nextjs/webAPI'
import resolveES from './resolve/packages/resolve-es/src/index'
import resolveESFile from './resolve/packages/resolve-es-file/src/index'
import resolveBus from './resolve/packages/resolve-bus/src/index'
import resolveBusMemory from './resolve/packages/resolve-bus-memory/src/index'
import resolveCommand from './resolve/packages/resolve-command/src/index'
import resolveQuery from './resolve/packages/resolve-query/src/index'
import aggregates from './aggregates/index'
import projections from './projections/index'
import { AUTH_JWT_SECRET } from './secret';

(async () => {
  const store = resolveES({
    driver: resolveESFile({
      pathToFile: 'EventStore'
    })
  })

  const bus = resolveBus({ driver: resolveBusMemory() })

  const executeCommand = resolveCommand({
    store,
    bus,
    aggregates
  })

  const executeQuery = resolveQuery({
    store,
    bus,
    projections
  })

  async function getInitialState({ cookies }) {
    const [todos] = await Promise.all([
      executeQuery('todos'),
    ])

    const { authorizationToken } = cookies

    let user
    try {
      user = jwt.verify(authorizationToken, AUTH_JWT_SECRET)
    } catch (error) {}

    return {
      todos
    }
  }

  const app = await webAPI({
    executeCommand,
    executeQuery,
    bus,
    routes,
    getInitialState
  })

  app.listen(3000, err => {
    if (err) {
      throw err
    }
    console.log('> Ready on http://localhost:3000')
  })
})()

function handleError(err) {
  console.error(err)
}

process.on('uncaughtException', handleError)
process.on('unhandledRejection', handleError)
