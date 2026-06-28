'use client'

import * as React from 'react'
import { useMemo, useState } from 'react'
import { storyblokEditable } from '@storyblok/react/rsc'
import type { LoanCalculatorContent } from '../../content'

export interface LoanPurpose {
  label: string
  interest_rate: number
}

export type LoanCalculatorProps = {
  blok: LoanCalculatorContent
}

const fmt = (n: number) =>
  '€ ' + n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

function LoanCalculator(props: LoanCalculatorProps) {
  const title = props.blok.title ?? 'Loan calculator'
  const minAmount = props.blok.min_amount ?? 2500
  const maxAmount = props.blok.max_amount ?? 75000
  const stepAmount = props.blok.step_amount ?? 2500
  const defaultAmount = props.blok.default_amount ?? 15000
  const minTerm = props.blok.min_term ?? 12
  const maxTerm = props.blok.max_term ?? 120
  const stepTerm = props.blok.step_term ?? 12
  const defaultTerm = props.blok.default_term ?? 60
  const ctaText = props.blok.cta_text ?? 'Apply for your personal loan'
  const ctaUrl =
    props.blok.cta_url && 'email' in props.blok.cta_url
      ? `mailto:${props.blok.cta_url.email}`
      : props.blok.cta_url?.cached_url ?? '#'
  const showDisclaimer = props.blok.show_disclaimer ?? true
  const loanPurposes =
    props.blok.loan_purposes && props.blok.loan_purposes.length > 0
      ? props.blok.loan_purposes
      : [{ label: 'Home renovation', interest_rate: 4.9 }]

  const [amount, setAmount] = useState(defaultAmount)
  const [term, setTerm] = useState(defaultTerm)
  const [selectedPurpose, setSelectedPurpose] = useState(
    loanPurposes?.[0]?.interest_rate ?? 4.9,
  )

  const { monthlyPayment, totalRepayment, totalInterest, loanPct } = useMemo(() => {
    const mr = (selectedPurpose / 100) / 12
    const mp =
      mr === 0
        ? Math.round(amount / term)
        : Math.round(
            (amount * (mr * Math.pow(1 + mr, term))) /
              (Math.pow(1 + mr, term) - 1),
          )
    const tot = mp * term
    const interest = tot - amount
    const pct = tot === 0 ? 0 : Math.round((amount / tot) * 100)
    return {
      monthlyPayment: mp,
      totalRepayment: tot,
      totalInterest: interest,
      loanPct: pct,
    }
  }, [amount, term, selectedPurpose])

  return (
    <section
      {...storyblokEditable(props.blok)}
      style={{ background: 'var(--color-background-secondary)', padding: '0 0 40px 0' }}
    >
      <div
        className="grid"
        style={{
          background: 'var(--color-background-primary)',
          border: '0.5px solid var(--color-border-tertiary)',
          borderRadius: '12px',
          padding: '32px 40px',
          gridTemplateColumns: '1fr 1fr',
          gap: '32px',
          width: '100%',
          maxWidth: '900px',
          margin: '0 auto',
        }}
      >
        <div className="col-span-2 flex items-center gap-2" style={{ gridColumn: '1 / -1' }}>
          <h2 className="text-[13px] font-medium" style={{ color: 'var(--color-text-primary)' }}>{title}</h2>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <div className="text-[10px]" style={{ color: 'var(--color-text-secondary)' }}>
              Loan amount
            </div>
            <div className="text-[14px] font-bold" style={{ color: 'var(--color-text-primary)' }}>
              {fmt(amount)}
            </div>
            <input
              type="range"
              min={minAmount}
              max={maxAmount}
              step={stepAmount}
              value={amount}
              onChange={(event) => setAmount(parseInt(event.target.value, 10))}
              className="w-full mt-2"
            />
            <div className="flex justify-between text-[10px] mt-1" style={{ color: 'var(--color-text-secondary)' }}>
              <span>{fmt(minAmount)}</span>
              <span>{fmt(maxAmount)}</span>
            </div>
          </div>

          <div>
            <div className="text-[10px]" style={{ color: 'var(--color-text-secondary)' }}>
              Term
            </div>
            <div className="text-[14px] font-bold" style={{ color: 'var(--color-text-primary)' }}>{term} months</div>
            <input
              type="range"
              min={minTerm}
              max={maxTerm}
              step={stepTerm}
              value={term}
              onChange={(event) => setTerm(parseInt(event.target.value, 10))}
              className="w-full mt-2"
            />
            <div className="flex justify-between text-[10px] mt-1" style={{ color: 'var(--color-text-secondary)' }}>
              <span>{minTerm} mo</span>
              <span>{maxTerm} mo</span>
            </div>
          </div>

          <div>
            <label
              className="text-[10px] mb-1 block"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Purpose
            </label>
            <select
              value={selectedPurpose}
              onChange={(event) => setSelectedPurpose(parseFloat(event.target.value))}
              className="w-full text-[12px]"
            >
              {loanPurposes.map((purpose, index) => (
                <option
                  key={index}
                  value={purpose.interest_rate}
                >
                  {purpose.label} - {purpose.interest_rate}%
                </option>
              ))}
            </select>
          </div>

          {showDisclaimer ? (
            <div
              className="text-[10px] text-center mt-2"
              style={{ color: 'var(--color-text-tertiary)' }}
            >
              Warning! Borrowing money costs money.
            </div>
          ) : null}
        </div>

        <div className="flex flex-col gap-3">
          <div
            className="text-center"
            style={{
              background: 'var(--color-background-secondary)',
              borderRadius: '8px',
              padding: '14px',
            }}
          >
            <div className="text-[10px]" style={{ color: 'var(--color-text-secondary)' }}>
              Monthly payment
            </div>
            <div className="text-[26px] font-bold" style={{ color: '#1a3d5c' }}>
              {fmt(monthlyPayment)}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div
              className="text-center"
              style={{
                background: 'var(--color-background-secondary)',
                borderRadius: '8px',
                padding: '10px',
              }}
            >
              <div className="text-[10px]" style={{ color: 'var(--color-text-secondary)' }}>
                Total repayment
              </div>
              <div className="text-[13px] font-medium" style={{ color: 'var(--color-text-primary)' }}>
                {fmt(totalRepayment)}
              </div>
            </div>
            <div
              className="text-center"
              style={{
                background: 'var(--color-background-secondary)',
                borderRadius: '8px',
                padding: '10px',
              }}
            >
              <div className="text-[10px]" style={{ color: 'var(--color-text-secondary)' }}>
                Total interest
              </div>
              <div className="text-[13px] font-medium" style={{ color: 'var(--color-text-primary)' }}>
                {fmt(totalInterest)}
              </div>
            </div>
          </div>

          <div>
            <div
              className="h-[6px] rounded-[999px] overflow-hidden"
              style={{ background: 'var(--color-background-secondary)' }}
            >
              <div
                className="h-full"
                style={{
                  background: '#2e7d6b',
                  width: `${loanPct}%`,
                }}
              />
            </div>
            <div className="mt-1 flex justify-between text-[10px]" style={{ color: 'var(--color-text-secondary)' }}>
              <span>Loan</span>
              <span>Interest</span>
            </div>
          </div>

          <button
            type="button"
            className="block w-full border-0 rounded-[999px] text-[12px] font-medium"
            style={{
              background: '#f5a623',
              color: '#1a1a2e',
              padding: '9px',
            }}
            onClick={() => {
              if (ctaUrl) {
                window.location.href = ctaUrl
              }
            }}
          >
            {ctaText}
          </button>
        </div>
      </div>
    </section>
  )
}

export default LoanCalculator