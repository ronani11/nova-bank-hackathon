import * as React from 'react'
import { storyblokEditable } from '@storyblok/react/rsc'
import type { DisclaimerContent } from '../../content'

export type DisclaimerProps = {
  blok: DisclaimerContent
}

function Disclaimer(props: DisclaimerProps) {
  const text = (props.blok as { disclaimer_text?: string }).disclaimer_text

  if (!text || text.trim() === '') return null

  return (
    <div
      {...storyblokEditable(props.blok)}
      style={{
        background: '#1a3d5c',
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
      }}
    >
      <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '13px', fontWeight: 500 }}>
        {text}
      </span>
    </div>
  )
}

export default Disclaimer
