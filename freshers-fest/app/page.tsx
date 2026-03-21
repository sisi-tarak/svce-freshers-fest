import Navbar from '@/components/landing/Navbar'
import Hero from '@/components/landing/Hero'
import EventHighlights from '@/components/landing/EventHighlights'
import EventGrid from '@/components/landing/EventGrid'
import HackathonSection from '@/components/landing/HackathonSection'
import Schedule from '@/components/landing/Schedule'
import Speakers from '@/components/landing/Speakers'
import Testimonials from '@/components/landing/Testimonials'
import Sponsorship from '@/components/landing/Sponsorship'
import AmbassadorSection from '@/components/landing/AmbassadorSection'
import SocialContest from '@/components/landing/SocialContest'
import TeamSection from '@/components/landing/TeamSection'
import Registration from '@/components/landing/Registration'
import FAQ from '@/components/landing/FAQ'
import Footer from '@/components/landing/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <HackathonSection />
        <EventHighlights />
        <EventGrid />
        <Schedule />
        <Speakers />
        <Testimonials />
        <Sponsorship />
        <AmbassadorSection />
        <SocialContest />
        <TeamSection />
        <Registration />
        <FAQ />
      </main>
      <Footer />
    </>
  )
}
