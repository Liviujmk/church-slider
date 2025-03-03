'use client'

import { useQuery } from '@tanstack/react-query'
import { Music, FileMusicIcon as MusicNote } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'

const fetchDailySongs = async () => {
  const response = await window.electronAPI.getDailySongs()

  if (response.status === 'error') {
    throw new Error('Failed to fetch songs')
  }

  return response
}

export const TodayPlayedSongs = () => {
  const { data, isPending, isError } = useQuery({
    queryKey: ['daily-songs'],
    queryFn: fetchDailySongs
  })

  if (isPending) {
    return (
      <div className="space-y-3">
        <h2 className="text-lg font-bold">Redate astăzi</h2>
        <div className="grid gap-3">
          {[...Array(5)].map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex items-center p-4">
                  <div className="flex items-center justify-center w-10 h-10 mr-4 rounded-full bg-muted">
                    <Skeleton className="w-6 h-6 rounded-full" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <Skeleton className="w-3/4 h-4" />
                    <Skeleton className="w-1/4 h-3" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="p-6 text-center border rounded-lg border-destructive/20 bg-destructive/10">
        <h3 className="mb-2 font-medium text-destructive">Nu s-au putut încărca cântările</h3>
        <p className="text-sm text-muted-foreground">Te rugăm să încerci din nou</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-lg font-bold ">
          <Music className="w-6 h-6" />
          Redate astăzi
        </h2>
        {data.songs.length > 0 && (
          <Badge variant="outline" className="px-3 py-1">
            {data.songs.length} cântări
          </Badge>
        )}
      </div>

      <div className="grid gap-3">
        {data.songs.map((song) => (
          <Card
            key={song._id}
            className="overflow-hidden transition-all duration-200 hover:shadow-md hover:bg-accent/10 group"
          >
            <CardContent className="p-0">
              <div className="flex items-center p-4">
                <div className="flex items-center justify-center w-10 h-10 mr-4 transition-colors duration-200 rounded-full bg-primary/10 text-primary group-hover:bg-primary/20">
                  <MusicNote className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium line-clamp-1">{song.title}</h3>
                  {
                    <div className="flex items-center mt-1">
                      <Badge variant="secondary" className="text-xs">
                        {song.lyricsCount || 0} strofe
                      </Badge>
                    </div>
                  }
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {data.songs.length === 0 && (
        <div className="p-8 text-center border border-dashed rounded-lg">
          <Music className="w-8 h-8 mx-auto mb-3 text-muted-foreground" />
          <h3 className="mb-1 text-lg font-medium">Nu au fost cântări astăzi</h3>
          <p className="text-sm text-muted-foreground">
            Cântările pe care le asculți astăzi vor apărea aici
          </p>
        </div>
      )}
    </div>
  )
}
