import { useState, useEffect } from 'react'

import { Layout } from '@/pages/library'

export const useLayoutPreference = () => {
  const [layout, setLayout] = useState<Layout>(() => {
    return (localStorage.getItem('layout') as Layout) || 'list'
  })

  const [isCompact, setIsCompact] = useState(() => {
    const storedCompact = localStorage.getItem('isCompact')
    return storedCompact !== null ? JSON.parse(storedCompact) : true
  })

  useEffect(() => {
    localStorage.setItem('layout', layout)
  }, [layout])

  return { layout, setLayout, isCompact, setIsCompact }
}
