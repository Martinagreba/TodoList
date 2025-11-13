import { z } from 'zod';

export const TaskSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  notes: z.string().optional(),
  category: z.string(),
  date: z.date(),
});

export type TaskData = z.infer<typeof TaskSchema>;
