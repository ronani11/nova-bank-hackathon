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
        padding: '16px 24px',
        background: '#fff8e6',
        border: '1px solid #f5a623',
        borderRadius: '8px',
        margin: '24px auto',
        maxWidth: '900px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        fontSize: '14px',
        fontWeight: 500,
      }}
    >
      <div
        style={{
          width: '100%',
          borderRadius: '8px',
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
