import { useState, useEffect } from 'react'

import { Layout } from '@/pages/library'

export const useLayoutPreference = () => {
  const [layout, setLayout] = useState<Layout>(() => {
    return (localStorage.getItem('layout') as Layout) || 'grid'
  })

  const [isCompact, setIsCompact] = useState(() => {
    return Boolean(localStorage.getItem('isCompact'))
  })

  useEffect(() => {
    localStorage.setItem('layout', layout)
  }, [layout])

  return { layout, setLayout, isCompact, setIsCompact }
}
