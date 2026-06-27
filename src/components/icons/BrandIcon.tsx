import * as React from 'react'

export type BrandIconProps = {
  className?: string
}

function BrandIcon(props: BrandIconProps) {
  return (
    <img
      src="/novabank-logo.svg"
      alt="Novabank"
      className={props.className}
    />
  )
}

export default BrandIcon
