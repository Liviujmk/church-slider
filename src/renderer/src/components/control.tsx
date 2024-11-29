import { MdArrowLeft, MdArrowRight } from 'react-icons/md'

import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

const Control = () => {
  const sendCommand = (command: string) => {
    window.electronAPI.sendToPresentation(command)
  }

  return (
    <div className="flex items-center justify-center gap-4">
      <Button
        asChild
        size="icon"
        className="rounded-full cursor-pointer"
        variant="outline"
        onClick={() => sendCommand('prev')}
      >
        <MdArrowLeft size={20} />
      </Button>
      <div className="space-y-2">
        <p className="font-semibold select-none">
          Diapozitiv {1} din {7}
        </p>
        <Progress value={(1 / 7) * 100} className="h-2 rounded-none" />
      </div>
      <Button
        asChild
        size="icon"
        className="rounded-full cursor-pointer"
        variant="outline"
        onClick={() => sendCommand('next')}
      >
        <MdArrowRight size={20} />
      </Button>
    </div>
  )
}

export default Control
