
import path from 'path';
import dotenv from 'dotenv';
import { TSettings } from '../../type/settings';

dotenv.config();

console.log(path.join(__dirname, '../logger/logs/error.log'))

export const Settings: TSettings = {
    server: {
        PORT: 8000,
        apiPrefix: '/api'
    },
    cors: {
        origin: [process.env.CLIENT_URL || 'http://localhost:3000', '*'],
        optionsSuccessStatus: 200,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
        credentials: true,
    },
    database: {
        path: process.env.DATABASE_PATH || path.join(__dirname, '../database/database.sqlite3'),
        migrationsPath: process.env.DATABASE_MIGRATIONS_PATH || path.join(__dirname, '../database/migrations'),
    },
    auth: {
        JWT_SECRET_KEY: process.env.JWT_SECRET || 'your-secret-key',
    },
    logs: {
        file: process.env.LOG_FILE || path.join(__dirname, '../logs/combined.log'),
        errorFile: process.env.LOG_ERROR_FILE || path.join(__dirname, '../logs/error.log'),
        exceptionFile: process.env.LOG_EXCEPTION_FILE || path.join(__dirname, '../logs/exceptions.log'),
    },
};