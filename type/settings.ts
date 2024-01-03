 
import { z } from 'zod';

const serverSchema = z.object({
    PORT: z.number(),
    apiPrefix: z.string(),
});

const corsSchema = z.object({
    origin: z.union([z.string(), z.array(z.string())]),
    optionsSuccessStatus: z.number(),
    methods: z.array(z.string()),
    allowedHeaders: z.array(z.string()),
    credentials: z.boolean(),
});

export const SettingsSchema = z.object({
    server: serverSchema,
    cors: corsSchema,
    database: z.object({
        path: z.string(),
        migrationsPath: z.string(),
    }),
    auth: z.object({
        JWT_SECRET_KEY: z.string(),
    }),
    logs: z.object({
        file: z.string(),
        errorFile: z.string(),
        exceptionFile: z.string(),
    }),
});

export type TSettings = z.infer<typeof SettingsSchema>;