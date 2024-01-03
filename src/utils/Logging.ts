
import winsten from 'winston'
import { Settings } from '../config/settings'
import path from 'path'

const logFormat = winsten.format.combine(
      winsten.format.timestamp(),
      winsten.format.json(),
      winsten.format.prettyPrint()
)

const logger = winsten.createLogger({
      level: 'info',
      format: logFormat,
      transports: [
            new winsten.transports.Console(),
            new winsten.transports.File({ filename: Settings.logs.errorFile, level: 'error' }),
            new winsten.transports.File({ filename: Settings.logs.exceptionFile, level: 'exceptions' }),
            new winsten.transports.File({ filename: Settings.logs.file, level: 'info' })
      ],
      exceptionHandlers: [
            new winsten.transports.File({ filename: path.join(__dirname, '../logs/exceptions.log'), level: 'exceptions' })
      ],
      exitOnError: false,
      levels: winsten.config.npm.levels,
      handleRejections: true
})

export default logger