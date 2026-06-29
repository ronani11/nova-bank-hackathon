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
        display: 'flex',
        justifyContent: 'center',
        padding: '24px 24px 12px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '980px',
          background: '#ffffff',
          border: '1px solid #d8dee4',
          borderRadius: '8px',
          padding: '8px 12px',
          boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
        }}
      >
        <Image
          src={afmWarningImage}
          alt="Let op! Geld lenen kost geld."
          width={2358}
          height={80}
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
      </div>
    </div>
  )
}

export default Disclaimer
