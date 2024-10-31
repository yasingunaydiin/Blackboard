import { z } from 'zod';

export const todoSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(100, 'Title must be 100 characters or less'),
  isCompleted: z.boolean().default(false),
});

export type TodoSchema = z.infer<typeof todoSchema>;
