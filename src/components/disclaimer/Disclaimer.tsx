import * as React from 'react'
import { storyblokEditable } from '@storyblok/react/rsc'
import type { DisclaimerContent } from '../../content'

export type DisclaimerProps = {
  blok: DisclaimerContent
}

function Disclaimer(props: DisclaimerProps) {
  const text = props.blok.disclaimer_text?.trim() || 'Let op! Geld lenen kost geld.'

  return (
    <div
      {...storyblokEditable(props.blok)}
      style={{
        margin: '0 auto',
        maxWidth: '100%',
        padding: '16px 24px',
      }}
    >
      <div
        style={{
          border: '1px solid #f5a623',
          borderRadius: '8px',
          background: '#fff8e6',
          padding: '12px 16px',
          textAlign: 'center',
        }}
      >
        <span style={{ fontSize: '12px', color: '#92400e', fontWeight: 500 }}>{text}</span>
      </div>
    </div>
  )
}

export default Disclaimer
