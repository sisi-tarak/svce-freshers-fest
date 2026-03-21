'use client'

import Accordion from '@/components/ui/Accordion'
import SectionHeading from '@/components/ui/SectionHeading'

const FAQ_ITEMS = [
  { id: '1', question: 'How much does entry cost?', answer: 'External participants: ₹200. SVCE students: ₹200 or Free (based on internal survey). Hackathon has an additional ₹100 fee covering Day 1 dinner + 2 snack rounds.' },
  { id: '2', question: 'What does the ticket include?', answer: 'Full access to: workshops (3 parallel tracks), project exhibition, startup showcase, SVCEians success stories, fun stalls, musical evening, and all meals. Hackathon requires an additional ₹100 add-on.' },
  { id: '3', question: 'How do I get tickets?', answer: 'Register on this page. Ticket9 handles payment. You\'ll receive a QR code via WhatsApp & Email. Show QR at gate for entry.' },
  { id: '4', question: 'How many hackathon domains are there?', answer: '4 student-friendly domains: Smart Daily Life, Local Community Solutions, Campus & Student Life Tech, and Green & Clean Environment.' },
  { id: '5', question: 'How many workshops are there?', answer: '3 parallel workshops on April 11 (2–4 PM): AI & Machine Learning, Web Development, and Cybersecurity.' },
  { id: '6', question: 'Can I participate in the hackathon from outside SVCE?', answer: 'Yes! External participants can form teams and compete. Cross-college teams are allowed. Team size is 2–5 members. Each team picks one of 4 domains.' },
  { id: '7', question: 'What should I bring?', answer: 'Laptop, charger, college ID. Everything else is provided including meals, snacks, and workspace.' },
  { id: '8', question: 'Is the Musical Evening open to all?', answer: 'Only registered participants. No walk-ins allowed for security and capacity reasons. Closed event.' },
  { id: '9', question: 'Is there a DJ?', answer: 'No DJ. The Musical Evening features SVCE\'s own college band, solo performers, and group acts — 100% SVCE student talent.' },
  { id: '10', question: 'How do I become a Campus Ambassador?', answer: 'Apply via the Campus Ambassador section above. 1 ambassador per college. Every 10 registrations using your referral code = 1 FREE PASS. Plus: official GDG + SVCE certificate, backstage access, featured on this page.' },
  { id: '11', question: 'How do I get my e-ticket?', answer: 'Register via Ticket9. You\'ll receive a QR code instantly via WhatsApp & Email. Show the QR at the registration desk for entry.' },
  { id: '12', question: 'Is food included?', answer: 'Yes. All meals and snacks are included for registered participants. Hackathon participants get additional dinner + midnight snacks.' },
]

export default function FAQ() {
  return (
    <section id="faq" className="section-padding relative overflow-hidden" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full blur-3xl pointer-events-none" style={{ backgroundColor: 'var(--bg-tertiary)', opacity: 0.3 }} />
      <div className="max-w-3xl mx-auto relative z-10">
        <SectionHeading
          title="Got Questions?"
          subtitle="Everything you need to know about SVCE Freshers Fest 2026."
        />
        <Accordion items={FAQ_ITEMS} />
      </div>
    </section>
  )
}
