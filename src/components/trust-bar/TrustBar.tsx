import * as React from 'react'
import { storyblokEditable } from '@storyblok/react/rsc'
import type { TrustBarContent } from '../../content'

export type TrustBarProps = {
  blok: TrustBarContent
}

function TrustBar(props: TrustBarProps) {
  return (
    <section
      {...storyblokEditable(props.blok)}
      style={{
        padding: '18px 48px',
        background: 'var(--color-background-secondary)',
      }}
    >
      <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {props.blok.items?.map((item) => (
          <div
            key={item._uid}
            className="flex items-center rounded-xl border border-slate-200 bg-white px-6 py-5 text-slate-900"
            style={{
              gap: '10px',
              fontSize: '17px',
              fontWeight: 500,
            }}
          >
            <span
              style={{
                fontSize: '20px',
                color: '#2e7d6b',
              }}
              aria-hidden="true"
            >
              ✓
            </span>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default TrustBar