import * as React from 'react'
import { storyblokEditable } from '@storyblok/react/rsc'
import type { CardsContent } from '../content'
import type { RichTextContent } from '../delivery-api'
import RichTextView from '../components/RichText'
import Card from './Card'

export type CardsProps = {
  blok: CardsContent
}

const servicesDescription: RichTextContent = {
  type: 'doc',
  content: [
    {
      type: 'heading',
      attrs: { level: 2 },
      content: [
        {
          type: 'text',
          text: 'Onze diensten',
        },
      ],
    },
  ],
}

const serviceCardDescriptions: RichTextContent[] = [
  {
    type: 'doc',
    content: [
      {
        type: 'heading',
        attrs: { level: 3 },
        content: [
          {
            type: 'text',
            text: 'Persoonlijke lening',
          },
        ],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'Kies een persoonlijke lening met duidelijke voorwaarden en een rente die past bij uw situatie.',
          },
        ],
      },
    ],
  },
  {
    type: 'doc',
    content: [
      {
        type: 'heading',
        attrs: { level: 3 },
        content: [
          {
            type: 'text',
            text: 'Hypotheken',
          },
        ],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'Onze hypotheekadviseurs begeleiden u stap voor stap naar een verantwoorde financiering van uw woning.',
          },
        ],
      },
    ],
  },
  {
    type: 'doc',
    content: [
      {
        type: 'heading',
        attrs: { level: 3 },
        content: [
          {
            type: 'text',
            text: 'Beleggingen',
          },
        ],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'Bouw vermogen op met beleggingsoplossingen die aansluiten bij uw doelen, risicoprofiel en horizon.',
          },
        ],
      },
    ],
  },
]

function Cards(props: CardsProps) {
  return (
    <div
      className="self-stretch px-5 py-10 md:px-20 md:py-24 bg-neutral-100 items-center flex flex-col"
      {...storyblokEditable(props.blok)}
    >
      <div className="max-w-6xl flex flex-col gap-10">
        <div className="self-stretch flex-1 inline-flex flex-col justify-center items-start gap-2">
          <RichTextView doc={servicesDescription} />
        </div>
        <div className="self-stretch flex justify-start items-stretch gap-4 md:gap-6 flex-col md:flex-row">
          {props.blok.cards?.map((card, index) => (
            <Card
              className="flex-1 self-stretch"
              key={card._uid}
              blok={{
                ...card,
                description: serviceCardDescriptions[index] ?? card.description,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Cards
