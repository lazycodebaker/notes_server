// Author : Anshuman Tiwari ( lazycodebaker )

// Third-party imports

// Custom imports
import app from './app'
import logger from './src/Logger/Logging'
import { Settings } from './src/config/settings'
import createMicroOrmDatabase from './src/database/connector'

const startServer = async (): Promise<void> => {
      try {
            const PORT = Settings.server.PORT
            await createMicroOrmDatabase().then(async (options) => {
                  console.log('🚀 Database ready')

                  options.testConnection()
                  options.createTables()
                  options.orm.migrator.createInitialMigration()
                  options.syncModels()
                  options.orm.schema.updateSchema()

                  app.listen(PORT, () => {
                        console.log(`🚀 Express ready`)
                        logger.info(`🚀 Express ready`)
                        console.log(`🚀 Server ready at http://localhost:${PORT}`)
                  })
            })
            logger.info('🚀 Database ready')
      }
      catch (error) {
            console.error('Error starting the server:', error)
            logger.error('Error starting the server:', error)
            process.exit(1) // Exit the process if there's an error starting the server
      }
}

export default startServer

//npx mikro-orm migration:create --initial

// for creating table cli is ? 
// npx mikro-orm schema:update --run