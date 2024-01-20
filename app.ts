
// Author : Anshuman Tiwari ( lazycodebaker )

// Third-party imports
import express, { Express, Request, Response } from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'

// Custom imports
import logger from './src/Logger/Logging'
import { Settings } from './src/config/settings'
import setupRoutes from './src/routes'

// Create an express application
const app: Express = express()
// Configure express application
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

const corsOptions = Settings.cors
// setup cors
app.use(cors(corsOptions))
setupRoutes(app)

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
})

logger.info('🚀 Express configured')


export default app
