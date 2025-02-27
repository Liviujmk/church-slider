import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'

type CustomDialogProps = {
  children: React.ReactNode
  isOpen: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  title: string
  description?: string
}

export const BaseDialog = ({
  isOpen,
  setOpen,
  title,
  description,
  children
}: CustomDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}
