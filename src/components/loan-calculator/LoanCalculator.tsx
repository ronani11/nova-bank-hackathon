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
    <div
      {...storyblokEditable(props.blok)}
      style={{
        background: '#f0f2f5',
        padding: '40px 48px',
      }}
    >
      <div
        style={{
          background: '#ffffff',
          border: '1px solid #e0e4e8',
          borderRadius: '16px',
          padding: '32px',
          maxWidth: '860px',
          margin: '0 auto',
          boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
        }}
      >
        <h2
          style={{
            fontSize: '22px',
            fontWeight: 500,
            color: '#1a3d5c',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <i
            className="ti ti-calculator"
            style={{ fontSize: '22px', color: '#f5a623' }}
            aria-hidden="true"
          />
          {title}
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '32px',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <div style={{ fontSize: '11px', color: '#6b7280', marginBottom: '4px' }}>
                Loan amount
              </div>
              <div style={{ fontSize: '15px', fontWeight: 500, color: '#1a3d5c' }}>
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
              <div className="flex justify-between text-[10px] mt-1" style={{ color: '#6b7280' }}>
                <span>{fmt(minAmount)}</span>
                <span>{fmt(maxAmount)}</span>
              </div>
            </div>

            <div>
              <div style={{ fontSize: '11px', color: '#6b7280', marginBottom: '4px' }}>
                Term
              </div>
              <div style={{ fontSize: '15px', fontWeight: 500, color: '#1a3d5c' }}>{term} months</div>
              <input
                type="range"
                min={minTerm}
                max={maxTerm}
                step={stepTerm}
                value={term}
                onChange={(event) => setTerm(parseInt(event.target.value, 10))}
                className="w-full mt-2"
              />
              <div className="flex justify-between text-[10px] mt-1" style={{ color: '#6b7280' }}>
                <span>{minTerm} mo</span>
                <span>{maxTerm} mo</span>
              </div>
            </div>

            <div>
              <label
                style={{
                  fontSize: '11px',
                  color: '#6b7280',
                  marginBottom: '4px',
                  display: 'block',
                }}
              >
                Purpose
              </label>
              <select
                value={selectedPurpose}
                onChange={(event) => setSelectedPurpose(parseFloat(event.target.value))}
                className="w-full text-[12px]"
                style={{ fontSize: '15px', fontWeight: 500, color: '#1a3d5c' }}
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
          </div>

          <div>
            <div
              style={{
                background: '#1a3d5c',
                borderRadius: '12px',
                padding: '20px',
                textAlign: 'center',
                marginBottom: '12px',
              }}
            >
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '11px', marginBottom: '4px' }}>
                Monthly payment
              </p>
              <p style={{ color: '#f5a623', fontSize: '32px', fontWeight: 500 }}>
                {fmt(monthlyPayment)}
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '8px',
                marginBottom: '12px',
              }}
            >
              <div
                style={{
                  background: '#f0f2f5',
                  borderRadius: '8px',
                  padding: '12px',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '10px', color: '#6b7280' }}>
                  Total repayment
                </div>
                <div style={{ fontSize: '14px', fontWeight: 500, color: '#1a3d5c' }}>
                  {fmt(totalRepayment)}
                </div>
              </div>

              <div
                style={{
                  background: '#f0f2f5',
                  borderRadius: '8px',
                  padding: '12px',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '10px', color: '#6b7280' }}>
                  Total interest
                </div>
                <div style={{ fontSize: '14px', fontWeight: 500, color: '#1a3d5c' }}>
                  {fmt(totalInterest)}
                </div>
              </div>
            </div>

            <div>
              <div
                style={{
                  background: '#e0e4e8',
                  height: '6px',
                  borderRadius: '999px',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    background: '#2e7d6b',
                    width: `${loanPct}%`,
                    height: '100%',
                  }}
                />
              </div>
              <div className="mt-1 flex justify-between text-[10px]" style={{ color: '#6b7280' }}>
                <span>Loan</span>
                <span>Interest</span>
              </div>
            </div>

            <button
              type="button"
              style={{
                width: '100%',
                background: '#f5a623',
                color: '#1a1a2e',
                border: 'none',
                borderRadius: '999px',
                padding: '11px',
                fontSize: '13px',
                fontWeight: 500,
                marginTop: '12px',
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

        {showDisclaimer ? (
          <div
            style={{
              marginTop: '20px',
              padding: '12px 16px',
              background: '#fff8e6',
              border: '1px solid #f5a623',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <i
              className="ti ti-alert-triangle"
              style={{ fontSize: '16px', color: '#d97706', flexShrink: 0 }}
              aria-hidden="true"
            />
            <span style={{ fontSize: '12px', color: '#92400e', fontWeight: 500 }}>
              Warning! Borrowing money costs money.
            </span>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default LoanCalculator