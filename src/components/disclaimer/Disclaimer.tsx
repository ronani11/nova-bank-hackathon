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
        padding: '16px 24px 24px',
        margin: 0,
      }}
    >
      <div
        style={{
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: '8px',
          padding: '12px 20px',
          maxWidth: '900px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <span aria-hidden="true" style={{ color: '#f5a623', fontSize: '14px', lineHeight: 1 }}>
          i
        </span>
        <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '13px', fontWeight: 500 }}>
          {text}
        </span>
      </div>
    </div>
  )
}

export default Disclaimer
