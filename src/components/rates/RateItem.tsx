import * as React from 'react'

export type RateItemProps = {
  purpose: string
  rate: string
  featured?: boolean
}

function RateItem(props: RateItemProps) {
  const isFeatured = props.featured ?? false

  return (
    <article
      className={`rounded-[12px] p-[18px] text-center bg-white ${
        isFeatured ? 'border-2 border-[#1a3d5c]' : 'border-[0.5px] border-[#e0e0e0]'
      }`}
    >
      {isFeatured ? (
        <div className="inline-block text-[10px] bg-[#e6f1fb] text-[#185fa5] rounded-[999px] px-[10px] py-[2px] mb-2">
          Most popular
        </div>
      ) : null}
      <div className="text-[11px] text-[#666] mb-2">{props.purpose}</div>
      <div className="text-[22px] font-medium text-[#1a3d5c]">{props.rate}</div>
      <div className="text-[10px] text-[#999]">from (annual)</div>
    </article>
  )
}

export default RateItem