
// Third-party imports
import { MikroORM, SqliteDriver } from "@mikro-orm/sqlite";

// Custom imports
import models from "../models";
import { Settings } from "./settings";

// Initialize MikroORM
export default {
    migrations: {
        path: Settings.database.migrationsPath,
        pattern: /^[\w-]+\d+\.[tj]s$/,
    },
    entities: [...models],
    type: 'sqlite',
    dbName: Settings.database.path,
} as Parameters<typeof MikroORM.init<SqliteDriver>>[0]
