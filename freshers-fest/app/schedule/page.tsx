import Navbar from '@/components/landing/Navbar'
import Schedule from '@/components/landing/Schedule'
import Footer from '@/components/landing/Footer'

export const metadata = {
  title: 'Schedule — SVCE Freshers Fest 2026 | April 10-11',
  description: 'Complete two-day schedule for SVCE Freshers Fest 2026. Day 1: Technology — Hackathon, Workshops, Exhibition. Day 2: Celebration — Success Stories, Musical Evening & more.',
}

export default function SchedulePage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <Schedule />
      </main>
      <Footer />
    </>
  )
}
