import { z } from 'zod'

export const createSongSchema = z.object({
  title: z.string().min(2).max(50),
  verses: z.string().min(2)
})
