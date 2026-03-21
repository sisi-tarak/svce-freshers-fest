import Navbar from '@/components/landing/Navbar'
import Hero from '@/components/landing/Hero'
import EventGrid from '@/components/landing/EventGrid'
import EventHighlights from '@/components/landing/EventHighlights'
import HackathonSection from '@/components/landing/HackathonSection'
import Speakers from '@/components/landing/Speakers'
import Testimonials from '@/components/landing/Testimonials'
import Registration from '@/components/landing/Registration'
import Sponsorship from '@/components/landing/Sponsorship'
import AmbassadorSection from '@/components/landing/AmbassadorSection'
import SocialContest from '@/components/landing/SocialContest'
import TeamSection from '@/components/landing/TeamSection'
import FAQ from '@/components/landing/FAQ'
import Footer from '@/components/landing/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <EventGrid />
        <EventHighlights />
        <HackathonSection />
        <Speakers />
        <Testimonials />
        <Registration />
        <Sponsorship />
        <AmbassadorSection />
        <SocialContest />
        <TeamSection />
        <FAQ />
      </main>
      <Footer />
    </>
  )
}
