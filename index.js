import 'babel-polyfill'
import resolveES from 'resolve-es'
import resolveESFile from 'resolve-es-file'
import resolveBus from 'resolve-bus'
import resolveBusMemory from 'resolve-bus-memory'
import resolveCommand from 'resolve-command'
import resolveQuery from 'resolve-query'
import routes from './routes'
import webAPI from './webAPI'
import aggregates from './aggregates'
import projections from './projections'
import config from './config';

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
    const [todos] = await Promise.all([executeQuery('todos')])

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
