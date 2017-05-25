import http from 'http'
import next from 'next'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import express from 'express'
import socketIO from 'socket.io'
import jwt from 'jsonwebtoken'

export default async function webAPI({
  executeCommand,
  executeQuery,
  projections,
  bus,
  routes,
  getInitialState,
  config
}) {
  const dev = process.env.NODE_ENV !== 'production'

  const client = next({ dev })

  const handler = routes.getRequestHandler(client)

  await client.prepare()

  const app = express()
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(cookieParser())

  app.get('/auth', (req, res) => {
    res.redirect(`https://internal.devexpress.com/azure-auth/login?redirect=${config.protocol}://${config.host}:${config.port}/auth/callback`)
  })
  app.get('/auth/callback', (req, res) => {
    res.cookie('authorizationToken', req.query.token, { maxAge: 86400000, httpOnly: true })
    res.redirect('/')
  })

  app.get('/api/:projectionName', async (req, res, next) => {
    const { projectionName } = req.params
    if (!projections.find(({ name }) => projectionName === name)) {
      return next()
    }
    try {
      res.json(await executeQuery(projectionName))
    } catch (error) {
      res.status(500).send(error.toString())
    }
  })

  app.use(async (req, res, next) => {
    const { authorizationToken } = req.cookies

    try {
      req.user = jwt.verify(authorizationToken, config.secret)
    } catch (error) {
      req.user = {}
    }

    next()
  })

  app.post('/api/commands/', async (req, res) => {
    const command = {
      ...req.body,
      payload: {
        ...req.body.payload,
        user: req.user.upn
      }
    }

    try {
      await executeCommand(command)
      res.status(200).send('ok')
    } catch (error) {
      res.status(500).send(error.toString())
    }
  })

  setTimeout(() => {
    app.use(async (req, res, next) => {
      try {
        req.initialState = await getInitialState({
          url: req.url,
          cookies: req.cookies,
          user: req.user
        })
      } catch (error) {
        return res.status(500).send(error.toString())
      }
      next()
    })

    app.use(handler)

    const projectionHandlerTypes = new Set()
    for (let projection of projections) {
      for (let eventHandlerType in projection.eventHandlers) {
        projectionHandlerTypes.add(eventHandlerType)
      }
    }

    const server = http.Server(app)
    const socketIOServer = socketIO(server)
    socketIOServer.on('connection', function(client) {
      const timestamp = Date.now()
      bus.onEvent(Array.from(projectionHandlerTypes), event => {
        if (event.timestamp > timestamp) {
          client.emit('event', JSON.stringify(event))
        }
      })
    })

    server.listen(config.port, config.host, err => {
      if (err) {
        throw err
      }
      console.log(`> Ready on =${config.protocol}://${config.host}:${config.port}`)
    })
  }, 0)

  return app
}