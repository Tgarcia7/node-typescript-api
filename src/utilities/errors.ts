import { Application, NextFunction, Request, Response } from 'express'

export function loadErrorHandlers(app: Application): void {
  // catch not found routes
  app.use((req: Request, res: Response) => {
    res.status(404).send({ message: 'not found' })
  })

  // catch exceptions thrown in code
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err)
    res.status(500).send('server error') // { message: err.message }
  })

  // catch unhandled exceptions
  function handleFatalError (err: Error): void {
    console.error('[fatal error]')
    console.error(err)
    process.exit(1)
  }

  process.on('uncaughtException', handleFatalError)
  process.on('unhandledRejection', handleFatalError)
}
