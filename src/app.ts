import express from 'express'
import todoRoutes from './routes/todos.js'
import { loadErrorHandlers } from './utilities/errors.js'
import bodyParser from 'body-parser'

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/todos', todoRoutes)

loadErrorHandlers(app)

export default app

