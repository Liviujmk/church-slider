import { z } from 'zod'

const isValidCantare = (text: string): boolean => {
  const lines = text
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line !== '')

  if (lines.length < 2) return false

  let stanzaCount = 0
  let currentStanzaLines = 0

  for (const line of lines) {
    if (line.match(/^\d+\./)) {
      continue
    }

    if (line.match(/^\d+\./)) {
      if (currentStanzaLines > 0) stanzaCount++
      currentStanzaLines = 0
    } else {
      currentStanzaLines++
    }
  }

  if (currentStanzaLines > 0) stanzaCount++

  return stanzaCount > 0
}

export const createSongSchema = z.object({
  title: z.string().min(2).max(50),
  verses: z.string().min(2).refine(isValidCantare, {
    message: 'Cântarea trebuie să conțină cel puțin o strofă validă.'
  })
})
