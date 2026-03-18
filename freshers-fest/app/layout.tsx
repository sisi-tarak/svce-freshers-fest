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
  title: 'PRECIOUS FIRST — SVCE Freshers Fest 2026 | April 10-11 | SVCE Tirupati',
  description:
    'SVCE Freshers Fest 2026 — Precious First. 24-Hour Hackathon, Workshops, Startup Showcase, Musical Evening & more. April 10-11, 2026. SVCE Tirupati. Register now at Rs. 200 via Ticket9.',
  keywords: [
    'SVCE Freshers Fest 2026', 'Precious First', 'SVCE Tirupati', 'GDG SVCE',
    'hackathon Tirupati', 'freshers fest 2026', 'SVCEFreshersFest2026', 'Ticket9',
  ],
  openGraph: {
    title: 'PRECIOUS FIRST — SVCE Freshers Fest 2026',
    description: '24-Hour Hackathon | Workshops | Success Stories | Startup Showcase | Musical Evening. April 10-11, 2026. SVCE Tirupati. Register now.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'SVCE Freshers Fest 2026',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PRECIOUS FIRST — SVCE Freshers Fest 2026',
    description: '24-Hour Hackathon | Workshops | Success Stories | Startup Showcase | Musical Evening. April 10-11, 2026. SVCE Tirupati.',
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
