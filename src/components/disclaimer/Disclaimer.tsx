import * as React from 'react'
import { storyblokEditable } from '@storyblok/react/rsc'
import Image from 'next/image'
import type { DisclaimerContent } from '../../content'

export type DisclaimerProps = {
  blok: DisclaimerContent
}

function Disclaimer(props: DisclaimerProps) {
  return (
    <div
      {...storyblokEditable(props.blok)}
      style={{
        margin: '0 auto',
        maxWidth: '100%',
        padding: '16px 24px',
      }}
    >
      <Image
        src={props.blok.afm_image?.filename || '/afm-kredietwaarschuwing.webp'}
        alt="Let op! Geld lenen kost geld."
        width={400}
        height={60}
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    </div>
  )
}

export default Disclaimer
