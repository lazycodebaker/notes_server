
import { z } from 'zod';

export const userSchema = z.object({
    id: z.string(),
    username: z.string(),
    password: z.string(),
    isLogged: z.boolean(),
    createdAt: z.date(),
    salt : z.string()
});

export const userListSchema = z.array(userSchema);

export type TUser = z.infer<typeof userSchema>;