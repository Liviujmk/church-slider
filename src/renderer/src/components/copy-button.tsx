import { Button } from '@/components/ui/button'
import { Song } from '@/types'
import { Check, Copy } from 'lucide-react'
import { useState } from 'react'

type CopyBtnProps = {
  song: Song
}

export function CopyButton({ song }: CopyBtnProps) {
  const [copied, setCopied] = useState(false)

  if (!song) return
  const formattedLyrics = Object.values(song.slides)
    .map((lyric) => lyric.join('\n'))
    .join('\n\n')

  const copyToClipboard = () => {
    navigator.clipboard.writeText(formattedLyrics)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative flex items-center">
      <Button
        variant="outline"
        size="icon"
        className="relative ml-2 rounded-md"
        onClick={copyToClipboard}
        aria-label={copied ? 'Copied' : 'Copy to clipboard'}
      >
        <span className="sr-only">{copied ? 'Copied' : 'Copy'}</span>
        <Copy
          className={`h-4 w-4 transition-all duration-300 ${copied ? 'scale-0' : 'scale-100'}`}
        />
        <Check
          className={`absolute inset-0 m-auto h-4 w-4 transition-all duration-300 ${
            copied ? 'scale-100' : 'scale-0'
          }`}
        />
      </Button>
    </div>
  )
}
