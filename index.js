import 'babel-polyfill'
import routes from './routes'
import webAPI from './resolve/packages/resolve-nextjs/web_api'
import resolveES from './resolve/packages/resolve-es/src/index'
import resolveESFile from './resolve/packages/resolve-es-file/src/index'
import resolveBus from './resolve/packages/resolve-bus/src/index'
import resolveBusMemory from './resolve/packages/resolve-bus-memory/src/index'
import resolveCommand from './resolve/packages/resolve-command/src/index'
import resolveQuery from './resolve/packages/resolve-query/src/index'
import aggregates from './aggregates/index'
import projections from './projections/index'
import config from './config'

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

  async function getInitialState({ user }) {
    const [todos] = await Promise.all([
      executeQuery('todos'),
    ])

    return {
      todos,
      user
    }
  }

  const app = await webAPI({
    executeCommand,
    executeQuery,
    bus,
    projections,
    routes,
    getInitialState,
    config
  })
})()

function handleError(err) {
  console.error(err)
}

process.on('uncaughtException', handleError)
process.on('unhandledRejection', handleError)
