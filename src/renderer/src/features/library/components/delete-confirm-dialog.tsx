import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'

import { useToast } from '@/hooks/use-toast'
import { Song } from '@/types'

type DeleteConfimationDialogProps = {
  isDeleteDialogOpen: boolean
  setIsDeleteDialogOpen: (value: boolean) => void
  songToDelete: Song | null
}

export const DeleteConfirmationDialog = ({
  isDeleteDialogOpen,
  setIsDeleteDialogOpen,
  songToDelete
}: DeleteConfimationDialogProps) => {
  const { toast } = useToast()

  const handleDelete = async (id: string) => {
    try {
      const response = await window.electronAPI.removeSong(id)
      if (response.success) {
        window.location.reload()
        setIsDeleteDialogOpen(false)
      } else {
        toast({
          title: 'Eroare',
          description: 'Cântarea nu s-a șters! Incercați din nou!',
          duration: 3000
        })
      }
    } catch (error) {
      toast({
        title: 'Eroare',
        description: 'A aparut o eroare',
        duration: 3000
      })
    }
  }

  return (
    <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmați ștergerea</DialogTitle>
          <DialogDescription>
            Sunteți sigur că doriți să ștergeți cântarea &quot;
            {songToDelete?.title.replace('.pptx', '')}
            &quot;? Această acțiune nu poate fi anulată.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
            Anulează
          </Button>
          <Button
            variant="destructive"
            onClick={() => songToDelete?._id && handleDelete(songToDelete._id)}
          >
            Șterge
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
