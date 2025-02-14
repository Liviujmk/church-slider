import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

export const removeDiacritics = (text: string): string => {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

export const splitInTwo = (verses: string[]) => {
  const firstHalf = verses.slice(0, Math.ceil(verses.length / 2))
  const secondHalf = verses.slice(Math.ceil(verses.length / 2))

  return [firstHalf, secondHalf]
}
