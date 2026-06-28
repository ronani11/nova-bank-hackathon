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
        padding: '28px 48px',
        background: 'var(--color-background-secondary)',
      }}
    >
      <div className="mx-auto grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {props.blok.items?.map((item) => (
          <div
            key={item._uid}
            className="flex items-center rounded-xl border border-slate-200 bg-white px-8 py-6 text-slate-900"
            style={{
              gap: '12px',
              fontSize: '19px',
              fontWeight: 600,
            }}
          >
            <span
              style={{
                fontSize: '24px',
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