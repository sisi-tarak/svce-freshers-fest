import Navbar from '@/components/landing/Navbar'
import Hero from '@/components/landing/Hero'
import MilestonePricing from '@/components/landing/MilestonePricing'
import EventGrid from '@/components/landing/EventGrid'
import HackathonSection from '@/components/landing/HackathonSection'
import Schedule from '@/components/landing/Schedule'
import Speakers from '@/components/landing/Speakers'
import Sponsorship from '@/components/landing/Sponsorship'
import AmbassadorSection from '@/components/landing/AmbassadorSection'
import SocialContest from '@/components/landing/SocialContest'
import Registration from '@/components/landing/Registration'
import FAQ from '@/components/landing/FAQ'
import Footer from '@/components/landing/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <MilestonePricing />
        <EventGrid />
        <HackathonSection />
        <Schedule />
        <Speakers />
        <Sponsorship />
        <AmbassadorSection />
        <SocialContest />
        <Registration />
        <FAQ />
      </main>
      <Footer />
    </>
  )
}
