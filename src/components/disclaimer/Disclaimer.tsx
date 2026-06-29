import * as React from 'react'
import { storyblokEditable } from '@storyblok/react/rsc'
import Image from 'next/image'
import type { DisclaimerContent } from '../../content'

export type DisclaimerProps = {
  blok: DisclaimerContent
}

function Disclaimer(props: DisclaimerProps) {
  const afmWarningImage =
    'https://a.storyblok.com/f/293515764469721/2358x80/9a7209404a/afm-kredietwaarschuwing.webp'

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
        src={afmWarningImage}
        alt="Let op! Geld lenen kost geld."
        width={400}
        height={60}
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    </div>
  )
}

export default Disclaimer
