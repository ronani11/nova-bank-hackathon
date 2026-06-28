import * as React from 'react'
import { storyblokEditable } from '@storyblok/react/rsc'
import type { RatesContent } from '../../content'
import RateItem from './RateItem'

export type RatesProps = {
  blok: RatesContent
}

function Rates(props: RatesProps) {
  const items = props.blok.items ?? []

  return (
    <section
      {...storyblokEditable(props.blok)}
      className="bg-white px-6 py-12"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-[44px] font-medium">{props.blok.title}</h2>
          {props.blok.subtitle ? (
            <p className="mt-2 text-[20px] text-[#666]">{props.blok.subtitle}</p>
          ) : null}
        </div>

        <div
          className="grid gap-[14px]"
          style={{ gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }}
        >
          {items.map((item) => (
            <RateItem
              key={item._uid}
              purpose={item.purpose}
              rate={item.rate}
              featured={item.featured}
            />
          ))}
        </div>

        {props.blok.footnote ? (
          <p className="mt-4 text-[11px] text-[#999] text-center">{props.blok.footnote}</p>
        ) : null}
      </div>
    </section>
  )
}

export default Rates