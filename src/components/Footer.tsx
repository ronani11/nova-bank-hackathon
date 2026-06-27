'use client'
import * as React from 'react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { YoutubeIcon, XIcon, LinkedInIcon } from './icons'

export type FooterViewProps = {
  className?: string
}

const footerMenu = [
  {
    id: 0,
    title: 'Explore',
    items: [
      {
        label: 'Home',
        href: '/',
      },
      {
        label: 'Banking',
        href: '/services',
      },
      {
        label: 'About Novabank',
        href: '/about',
      },
      {
        label: 'Insights',
        href: '/blog',
      },
      {
        label: 'Contact',
        href: '/get-in-touch',
      },
    ],
  },
  {
    id: 1,
    title: 'Products',
    items: [
      {
        label: 'Daily Banking',
        href: '/brand',
      },
      {
        label: 'Savings',
        href: '/strategy',
      },
      {
        label: 'Mortgages',
        href: '/website',
      },
      {
        label: 'Business Accounts',
        href: '/marketing',
      },
      {
        label: 'Investments',
        href: '/design',
      },
    ],
  },
  {
    id: 2,
    title: 'Support',
    items: [
      {
        label: 'Security',
        href: '/enterprise',
      },
      {
        label: 'Customer Stories',
        href: '/case-studies',
      },
      {
        label: 'Legal',
        href: '/legal',
      },
    ],
  },
]

function FooterView(props: FooterViewProps) {
  const [path, setPath] = useState<string | undefined>(() => undefined)

  useEffect(() => {
    setPath(window.location.pathname)
  }, [])

  return (
    <div
      className={`self-stretch px-4 pt-10 pb-6 bg-stone-900 flex flex-col justify-center items-center gap-8 overflow-hidden sm:px-10 md:px-20 md:pt-20 md:pb-10 md:gap-12 ${props.className}`}
    >
      <div className="self-stretch flex flex-col justify-start items-center gap-2.5 md:flex-row md:items-center">
        <div className="w-full flex justify-start items-center gap-1 flex-wrap content-center md:w-[577px]">
          <div className="flex-1 text-white text-2xl font-extrabold leading-9 md:text-5xl md:leading-[62px]">
            Ready to get started with Novabank?
          </div>
        </div>
      </div>
      <div className="self-stretch flex flex-col gap-8 md:flex-row md:justify-between md:items-start">
        <div className="w-full flex flex-col justify-start items-start gap-6 md:w-[453.38px] md:gap-10">
          <div className="self-stretch text-white text-sm font-normal leading-relaxed md:text-base">
            Schedule an appointment with one of our advisors. We are happy to
            help you move forward.
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="https://www.linkedin.com/"
              className="text-white"
            >
              <LinkedInIcon />
            </Link>
            <Link
              href="https://x.com/"
              className="text-white"
            >
              <XIcon />
            </Link>
            <Link
              href="https://youtube.com/"
              className="text-white"
            >
              <YoutubeIcon />
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-8 w-full md:flex-row md:justify-start md:items-start md:gap-28 md:w-auto">
          {footerMenu?.map((menu) => (
            <div
              className="inline-flex flex-col justify-start items-start gap-2 md:gap-3.5"
              key={menu.id}
            >
              <div className="text-white text-lg font-semibold leading-6 md:text-xl md:leading-7">
                {menu.title}
              </div>
              {menu.items?.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-base font-medium leading-snug ${
                    path === item.href ? 'text-green-300' : 'text-white/70'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FooterView
