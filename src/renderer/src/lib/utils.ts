import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

export const removeDiacritics = (text: string): string => {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}
