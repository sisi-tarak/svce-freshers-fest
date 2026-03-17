import type { Metadata } from 'next'
import { Space_Grotesk, Inter } from 'next/font/google'
import ThemeProvider from '@/components/ThemeProvider'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Freshers Fest 2026 | Precious First — SVCE Tirupati',
  description:
    'The biggest fresher event at SVCE Tirupati. 24-hour hackathon, workshops, exhibitions, startup showcase, musical evening. April 10-11, 2026. Tech Meets Culture.',
  keywords: [
    'Freshers Fest', 'SVCE Tirupati', 'college fest', 'hackathon',
    'GDG SVCE', 'Precious First', 'tech fest 2026',
  ],
  openGraph: {
    title: 'Freshers Fest 2026 — Precious First | SVCE Tirupati',
    description: 'Where SVCE Proves It Is Technical. Cultural. Total. April 10-11, 2026.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'Freshers Fest 2026',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Freshers Fest 2026 — Precious First',
    description: 'Where SVCE Proves It Is Technical. Cultural. Total. April 10-11, 2026.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark ${spaceGrotesk.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="font-body antialiased" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
