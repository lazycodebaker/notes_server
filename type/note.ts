
import { z } from 'zod';
import { userSchema } from './user';

const noteSchema = z.object({
    id: z.string(),
    title: z.string(),
    content: z.string(),
    owner: userSchema,
    sharedWith: z.array(userSchema),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const noteListSchema = z.array(noteSchema);

export type TNote = z.infer<typeof noteSchema>;