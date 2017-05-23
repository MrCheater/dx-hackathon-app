import next from 'next'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import express from 'express'

export default async function webAPI({
  executeCommand,
  executeQuery,
  bus,
  routes,
  getInitialState
}) {
  const dev = process.env.NODE_ENV !== 'production'

  const client = next({ dev })

  const handler = routes.getRequestHandler(client)

  await client.prepare()

  const app = express()
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(cookieParser())
  app.use(async (req, res, next) => {
    try {
      req.initialState = await getInitialState({
        url: req.url,
        cookies: req.cookies
      })
    } catch (error) {
      res.status(500).end(error)
    }
    next()
  })

  app.get('/api/:projectionName', async (req, res, next) => {
    const { projectionName } = req.params
    if (!projections.find(({ name }) => projectionName === name)) {
      return next()
    }
    try {
      res.json(await executeQuery(projectionName))
    } catch (error) {
      res.status(500).end(error)
    }
  })

  app.post('/api/commands/', async (req, res) => {
    const command = req.body
    try {
      await executeCommand(command)
      res.status(200).end('ok')
    } catch (error) {
      res.status(500).end(error)
    }
  })

  setTimeout(() => app.use(handler), 0)

  return app
}
