import * as React from 'react'
import { storyblokEditable } from '@storyblok/react/rsc'
import NextImage from 'next/image'
import type { HeroContent } from '../content'
import RichTextView from '../components/RichText'
import { backgroundColor } from './backgroundColorClass'
import Button from './Button'

export type HeroProps = {
  blok: HeroContent
}

const rootAlignment = (content: HeroContent): string => {
  if (!content.image) {
    return 'flex flex-col md:flex-col'
  }
  switch (content.textAlignment) {
    case 'left':
      return 'flex flex-col md:flex-row'
    case 'right':
      return 'flex flex-col md:flex-row-reverse'
    case 'center':
      return 'flex flex-col md:flex-col'
  }
}

const textAlignment = (content: HeroContent): string => {
  if (!content.image) {
    return 'items-center'
  }
  switch (content.textAlignment) {
    case 'left':
    case 'right':
      return 'items-start'
    case 'center':
      return 'items-center'
  }
}

const navyPrimaryStyle: React.CSSProperties = {
  background: '#f5a623',
  color: '#1a1a2e',
  border: 'none',
  borderRadius: '999px',
}

const navySecondaryStyle: React.CSSProperties = {
  background: 'transparent',
  color: '#ffffff',
  border: '1px solid rgba(255,255,255,0.4)',
}

function Hero(props: HeroProps) {
  const isNavy = props.blok.background === 'navy' || props.blok.backgroundColor === 'navy'
  const hasImage = Boolean(
    props.blok.image?.filename &&
    props.blok.image.filename.trim() !== ''
  )
  const isNavyCentered = isNavy && !hasImage
  const showStats = props.blok.show_stats ?? false

  if (isNavyCentered) {
    return (
      <div
        {...storyblokEditable(props.blok)}
        className="navy-hero-centered"
        style={{ background: '#1a3d5c', color: 'white', padding: '64px 48px', textAlign: 'center' }}
      >
        <style>{`
          .navy-hero-centered .rich-text h1,
          .navy-hero-centered .rich-text h2,
          .navy-hero-centered .rich-text h3 {
            font-size: 40px; font-weight: 500; color: white; 
            max-width: 700px; margin: 0 auto 12px; text-align: center;
          }
          .navy-hero-centered .rich-text p {
            font-size: 14px; color: rgba(255,255,255,0.75);
            max-width: 520px; margin: 0 auto 20px; text-align: center;
          }
        `}</style>
        <RichTextView doc={props.blok.description} />
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
          {props.blok.buttons?.map((button) => (
            <Button
              key={button._uid}
              blok={button}
              style={button.color === 'secondary' ? navySecondaryStyle : navyPrimaryStyle}
            />
          ))}
        </div>
        {showStats ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '40px',
            maxWidth: '640px',
            margin: '40px auto 0',
            borderTop: '1px solid rgba(255,255,255,0.2)',
            paddingTop: '36px',
          }}>
            <div style={{textAlign: 'center'}}>
              <div style={{color: '#f5a623', fontSize: '44px', fontWeight: 500}}>4.9%</div>
              <div style={{color: 'rgba(255,255,255,0.55)', fontSize: '15px'}}>from (p.a.)</div>
            </div>
            <div style={{textAlign: 'center'}}>
              <div style={{color: '#f5a623', fontSize: '44px', fontWeight: 500}}>24h</div>
              <div style={{color: 'rgba(255,255,255,0.55)', fontSize: '15px'}}>decision</div>
            </div>
            <div style={{textAlign: 'center'}}>
              <div style={{color: '#f5a623', fontSize: '44px', fontWeight: 500}}>€75k</div>
              <div style={{color: 'rgba(255,255,255,0.55)', fontSize: '15px'}}>maximum</div>
            </div>
          </div>
        ) : null}
      </div>
    )
  }

  return (
    <div
      {...storyblokEditable(props.blok)}
      className={`self-stretch ${isNavy ? '' : backgroundColor(props.blok.backgroundColor)} flex justify-center`}
      style={isNavy ? { background: '#1a3d5c', color: 'white' } : undefined}
    >
      <div
        className={`w-full ${
          props.blok.imagePadding ? 'p-4 md:p-10' : 'p-0'
        } ${rootAlignment(props.blok)} flex-wrap justify-between max-w-7xl`}
      >
        <div
          className={`
          flex-1 p-6 md:p-12 lg:px-20 lg:py-25 inline-flex flex-col justify-center
          ${textAlignment(props.blok)}
        `}
        >
          <RichTextView doc={props.blok.description} />
          <div className="flex gap-2 md:gap-4 flex-wrap items-center">
            {props.blok.buttons?.map((button) => (
              <Button
                key={button._uid}
                blok={button}
                style={
                  isNavy
                    ? button.color === 'secondary'
                      ? navySecondaryStyle
                      : navyPrimaryStyle
                    : undefined
                }
              />
            ))}
          </div>
        </div>
        {props.blok.image?.filename ? (
          <div
            className={`relative flex-1 overflow-hidden md:min-h-[650px] ${
              props.blok.imagePadding
                ? 'rounded-xl max-h-[60vw] min-h-[40vw] md:max-h-[800px]'
                : 'rounded-none max-h-[100%] min-h-[40vw] md:min-h-[100%]'
            } `}
          >
            <NextImage
              src={props.blok.image?.filename}
              alt={props.blok.image?.alt ?? ''}
              width={1200}
              height={650}
              className={`absolute h-full w-full object-cover`}
            />
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default Hero
