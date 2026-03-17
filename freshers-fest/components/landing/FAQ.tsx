'use client'

import Accordion from '@/components/ui/Accordion'
import SectionHeading from '@/components/ui/SectionHeading'

const FAQ_ITEMS = [
  { id: '1', question: 'Who can attend?', answer: 'Any student. SVCE students get sliding-scale pricing. External students pay ₹199.' },
  { id: '2', question: 'What does the ticket include?', answer: 'Full access: hackathon, workshops, exhibitions, startup showcase, fun stalls, musical evening, meals.' },
  { id: '3', question: 'How does the sliding scale work?', answer: 'As more external students register, the internal (SVCE) price drops. 0-200 external = ₹99, 201-400 = ₹49, 401-600 = ₹19, 600+ = SVCE students get in FREE.' },
  { id: '4', question: 'Can I participate in the hackathon from outside SVCE?', answer: 'Yes! External participants can form teams and compete. Cross-college teams are allowed. Team size is 2-5 members.' },
  { id: '5', question: 'What should I bring?', answer: 'Laptop, charger, college ID. Everything else is provided including meals, snacks, and workspace.' },
  { id: '6', question: 'Is food included?', answer: 'Yes. All meals and snacks are included for registered participants — breakfast, lunch, dinner, midnight snacks during hackathon.' },
  { id: '7', question: 'How do I become a Campus Ambassador?', answer: 'Apply via the Campus Ambassador form above. Bring 10+ students from your college, get a free pass + official certificate from SVCE + GDG.' },
  { id: '8', question: 'Is the Musical Evening open to all?', answer: 'Only registered participants with wristbands. No walk-ins allowed for security and capacity reasons.' },
  { id: '9', question: 'What are the hackathon team sizes?', answer: '2 to 5 members per team. Cross-college teams are allowed and encouraged. Each team picks one of 6 domains.' },
  { id: '10', question: 'How do I get my e-ticket?', answer: 'Instantly after registration. A PDF with your unique QR code is sent to your email and available for immediate download. Show it at the registration desk for entry.' },
]

export default function FAQ() {
  return (
    <section id="faq" className="section-padding bg-bg-secondary">
      <div className="max-w-3xl mx-auto">
        <SectionHeading
          title="Got Questions?"
          subtitle="Everything you need to know about Freshers Fest 2026."
        />
        <Accordion items={FAQ_ITEMS} />
      </div>
    </section>
  )
}
