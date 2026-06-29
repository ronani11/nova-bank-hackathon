import * as React from 'react'
import { storyblokEditable } from '@storyblok/react/rsc'
import type { StepsContent } from '../../content'
import StepItem from './StepItem'

export type StepsProps = {
  blok: StepsContent
}

function Steps(props: StepsProps) {
  const items = props.blok.items ?? []

  return (
    <section
      {...storyblokEditable(props.blok)}
      className="px-6 py-12"
      style={{ background: '#f0f4f8' }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-[44px] font-medium text-center">{props.blok.title}</h2>
          {props.blok.subtitle ? (
            <p className="mt-2 text-[20px] text-[#666]">{props.blok.subtitle}</p>
          ) : null}
        </div>

        <div
          className="grid items-start gap-3 md:gap-4"
          style={{
            gridTemplateColumns:
              items.length === 3 ? '1fr 24px 1fr 24px 1fr' : `repeat(${items.length || 1}, minmax(0, 1fr))`,
          }}
        >
          {items.map((item, index) => (
            <React.Fragment key={item._uid}>
              <StepItem
                index={index}
                title={item.title}
                description={item.description}
              />
              {index < items.length - 1 ? (
                <div className="w-6 h-full flex items-center justify-center">
                  <span
                    className="ti-arrow-right text-[16px] text-[#aaa] leading-none"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </div>
              ) : null}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Steps