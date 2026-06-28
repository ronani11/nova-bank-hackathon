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
              className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-[10px] font-semibold uppercase tracking-wide text-slate-600"
              aria-hidden="true"
            >
              {item.icon.slice(0, 2)}
            </span>
            <span className="text-sm font-medium">{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default TrustBar