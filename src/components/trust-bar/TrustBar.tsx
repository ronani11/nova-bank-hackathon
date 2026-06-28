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
      className="px-6 py-6"
    >
      <div className="mx-auto grid max-w-7xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {props.blok.items?.map((item) => (
          <div
            key={item._uid}
            className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900"
          >
            <span
              style={{
                color: '#2e7d6b',
                fontWeight: 500,
                marginRight: '4px',
              }}
              aria-hidden="true"
            >
              ✓
            </span>
            <span className="text-sm font-medium">{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default TrustBar