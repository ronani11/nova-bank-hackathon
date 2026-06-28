import * as React from 'react'

export type StepItemProps = {
  title: string
  description: string
  index: number
}

function StepItem(props: StepItemProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-9 h-9 rounded-full bg-[#1a3d5c] text-white flex items-center justify-center text-sm font-medium">
        {props.index + 1}
      </div>
      <div className="mt-[10px] text-[13px] font-medium text-center">{props.title}</div>
      <div className="mt-1 text-[11px] text-[#666] text-center leading-[1.5]">
        {props.description}
      </div>
    </div>
  )
}

export default StepItem