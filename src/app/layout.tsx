import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import StoryblokProvider from '@/app/StoryblokProvider'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

const playfairDisplay = Playfair_Display({
  variable: '--font-playfair-display',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Novabank',
  description: 'Novabank is a Dutch financial services company for modern banking, savings, and lending.',
  icons: {
    icon: [{ url: '/novabank-logo.svg', type: 'image/svg+xml' }],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <StoryblokProvider>
      <html lang="en">
        <body
          className={`${inter.variable} ${playfairDisplay.variable} antialiased`}
        >
          {children}
        </body>
      </html>
    </StoryblokProvider>
  )
}
