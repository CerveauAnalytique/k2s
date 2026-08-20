import React from 'react'
import type { Page } from '@/payload-types'
import { PryselHero } from '@/heros/PryselHero'

export const RenderHero: React.FC<Page['hero']> = (props) => {
  const { type } = props || {}

  if (type === 'none') return null

  return <PryselHero {...props} />
}
