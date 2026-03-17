import type { EventCard, HackathonDomain, JudgingCriteria, ScheduleItem, SponsorTier } from '@/types'

export const EVENT_DATE = new Date('2026-04-10T09:00:00+05:30')
export const EVENT_END_DATE = new Date('2026-04-11T20:00:00+05:30')
export const HACKATHON_START = new Date('2026-04-10T12:00:00+05:30')
export const HACKATHON_END = new Date('2026-04-11T12:00:00+05:30')

// Unified ticket price for ALL students
export const TICKET_PRICE = 199

export const DEPARTMENTS = [
  'Computer Science & Engineering',
  'Electronics & Communication Engineering',
  'Electrical & Electronics Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Chemical Engineering',
  'Information Technology',
  'Artificial Intelligence & Data Science',
  'Biotechnology',
]

export const COURSES = ['B.Tech', 'Intermediate', 'Diploma', 'Other']

export const EVENTS: EventCard[] = [
  { icon: 'Code2', title: '24-Hour Hackathon', description: '6 domains. 24 hours. Build something real.', day: 'Day 1–2' },
  { icon: 'GraduationCap', title: 'Workshops', description: 'AI/ML, Web Dev, Arduino — hands-on, 90-minute deep dives.', day: 'Day 2' },
  { icon: 'Cpu', title: 'Hardware Exhibition', description: 'All 9 departments. Real engineering. Physical prototypes.', day: 'Day 2' },
  { icon: 'Rocket', title: 'Startup Showcase', description: 'Student & alumni startups. Live product demos.', day: 'Day 2' },
  { icon: 'Users', title: 'SVCEians Success Stories', description: 'Alumni who made it — raw, unfiltered Q&A.', day: 'Day 2' },
  { icon: 'Zap', title: 'Prelims & Tech Events', description: 'Tech Quiz, Speed Coding, Design Sprint, Pitch Battle.', day: 'Day 1' },
  { icon: 'Gamepad2', title: 'Fun Stalls', description: 'Escape the Bug, Robo-Sumo, Meme Wall, and more.', day: 'Both Days' },
  { icon: 'Music', title: 'Musical Evening', description: 'SVCE College Band + Open Mic. No DJs. 100% student talent.', day: 'Day 2' },
]

export const HACKATHON_DOMAINS: HackathonDomain[] = [
  { number: 1, title: 'Smart Agriculture & Rural Tech', areas: ['Crop disease detection', 'IoT soil sensors', 'Water management'] },
  { number: 2, title: 'HealthTech & Wellness', areas: ['Mental health apps', 'Patient management', 'First-aid AI'] },
  { number: 3, title: 'EdTech & Skill Development', areas: ['Personalized learning', 'Vernacular content', 'Skill gap tools'] },
  { number: 4, title: 'Sustainability & Clean Energy', areas: ['Solar optimization', 'Waste dashboards', 'Carbon tracking'] },
  { number: 5, title: 'Fintech & Rural Banking', areas: ['UPI innovations', 'Micro-lending', 'Rural financial literacy'] },
  { number: 6, title: 'Open Innovation (Wild Card)', areas: ['Any tech solution', 'Real Tirupati/AP local problem', 'Community impact'] },
]

export const JUDGING_CRITERIA: JudgingCriteria[] = [
  { name: 'Innovation & Originality', percentage: 25 },
  { name: 'Technical Complexity', percentage: 20 },
  { name: 'Problem-Solution Fit', percentage: 20 },
  { name: 'Demo Quality', percentage: 20 },
  { name: 'Impact & Scalability', percentage: 15 },
]

export const HACKATHON_TIMELINE = [
  { time: '10:00 AM', label: 'Demo Sessions & Orientation' },
  { time: '12:00 PM', label: 'Official Launch — Clock Starts' },
  { time: '2:30 PM', label: 'Mentoring Round 1' },
  { time: '7:00 PM', label: 'Mentoring Round 2 + Pivot Window' },
  { time: '9:00 PM', label: 'Midnight Mystery Puzzle Drop' },
  { time: '11:30 PM', label: 'Campus Band Energy Booster' },
  { time: '2:00 AM', label: 'Night Sprint Coaching' },
  { time: '9:00 AM', label: 'Code Freeze Warning' },
  { time: '12:00 PM', label: 'Hackathon Ends — Demos Begin' },
]

export const DAY1_SCHEDULE: ScheduleItem[] = [
  { time: '9:00 AM', title: 'External Registration Opens', venue: 'Main Gate', category: 'general' },
  { time: '9:30 AM', title: 'Campus Orientation for External Students', venue: 'Campus Tour', category: 'general' },
  { time: '10:00 AM', title: 'Hackathon Orientation & Demo Sessions', venue: 'Auditorium', category: 'hackathon' },
  { time: '12:00 PM', title: 'OFFICIAL HACKATHON LAUNCH — 24-Hour Clock Starts', venue: 'All Labs', category: 'hackathon' },
  { time: '1:30 PM', title: 'Lunch Break (Batch 1)', venue: 'Canteen', category: 'break' },
  { time: '2:30 PM', title: 'Mentoring Round 1', venue: 'Labs', category: 'hackathon' },
  { time: '3:00 PM', title: 'Prelims: Tech Quiz, Speed Coding, Design Sprint, Pitch Battle', venue: 'Multiple Venues', category: 'tech' },
  { time: '5:00 PM', title: 'Snack Break', venue: 'Canteen', category: 'break' },
  { time: '7:00 PM', title: 'Mentoring Round 2 + Pivot Window', venue: 'Labs', category: 'hackathon' },
  { time: '8:00 PM', title: 'Hackathon Dinner', venue: 'Canteen', category: 'break' },
  { time: '9:00 PM', title: 'Midnight Mystery Coding Puzzle', venue: 'Labs', category: 'hackathon' },
  { time: '11:30 PM', title: 'Campus Band Energy Booster', venue: 'Open Stage', category: 'cultural' },
]

export const DAY2_SCHEDULE: ScheduleItem[] = [
  { time: '2:00 AM', title: 'Night Sprint Mentoring', venue: 'Labs', category: 'hackathon' },
  { time: '8:00 AM', title: 'Breakfast Delivered to Labs', venue: 'Labs', category: 'break' },
  { time: '9:00 AM', title: 'Final Mentoring + Code Freeze Warning', venue: 'Labs', category: 'hackathon' },
  { time: '9:30 AM', title: 'Fun Stalls Open + Hardware Exhibition + Startup Showcase', venue: 'Campus Grounds', category: 'general' },
  { time: '11:00 AM', title: 'Hackathon Submissions Lock', venue: 'Online Portal', category: 'hackathon' },
  { time: '12:00 PM', title: 'HACKATHON ENDS + Freshers Inauguration Ceremony', venue: 'Auditorium', category: 'general' },
  { time: '1:30 PM', title: 'Lunch Break', venue: 'Canteen', category: 'break' },
  { time: '2:00 PM', title: 'Hackathon Public Demo & Judging + Workshops (3 Parallel Tracks)', venue: 'Labs + Seminar Halls', category: 'tech' },
  { time: '3:30 PM', title: 'SVCEians Success Stories — Alumni Q&A', venue: 'Auditorium', category: 'general' },
  { time: '4:15 PM', title: 'Podcast with Student Tribe', venue: 'Auditorium', category: 'cultural' },
  { time: '5:15 PM', title: 'Hackathon Results + All Prize Announcements', venue: 'Auditorium', category: 'general' },
  { time: '5:30 PM', title: 'Prize Distribution + Social Media Contest Winners', venue: 'Auditorium', category: 'general' },
  { time: '6:00 PM', title: 'MUSICAL EVENING: College Band + Open Mic + Group Acts', venue: 'Open Stage', category: 'cultural' },
  { time: '8:00 PM', title: 'Event Closes', venue: 'Campus', category: 'general' },
]

export const SPONSOR_TIERS: SponsorTier[] = [
  {
    name: 'Bronze', priceRange: '₹8,000 – ₹12,000', color: '#CD7F32',
    benefits: ['Logo on hackathon ID cards', 'Logo on hackathon lab screens', 'Name in brochure & landing page', 'Certificate of Association'],
  },
  {
    name: 'Silver', priceRange: '₹15,000 – ₹20,000', color: '#C0C0C0',
    benefits: ['All Bronze benefits', '5-minute speaking slot on stage', 'Logo on main stage banner + standees', 'MC mentions throughout event', 'Featured Instagram post'],
  },
  {
    name: 'Gold', priceRange: '₹25,000 – ₹40,000', color: '#FFD700',
    benefits: ['All Silver benefits', 'Dedicated branded stall on campus', 'Direct interaction with hackathon teams', 'Access to participant portfolios', 'Internship/recruitment offers to top teams', '10-minute speaking slot', 'Exclusive Award Ceremony branding'],
  },
]

export const SPEAKER_PLACEHOLDERS = [
  { name: 'Rahul Sharma', current_role: 'Co-Founder & CTO', company: 'TechStartup Inc.', description: 'SVCE \'18 batch. Built a SaaS platform from his hostel room. Now serves 50K+ users.', speaker_type: 'Startup Founder' },
  { name: 'Priya Reddy', current_role: 'Senior Software Engineer', company: 'Google', description: 'SVCE \'16 batch. From campus placements to leading a team at Google Cloud.', speaker_type: 'FAANG Engineer' },
  { name: 'Karthik Nair', current_role: 'IAS Officer', company: 'Government of Andhra Pradesh', description: 'SVCE \'14 batch. Cleared UPSC in first attempt. Shares the engineering-to-civil-services journey.', speaker_type: 'Civil Services' },
]

export const AMBASSADOR_BENEFITS = [
  { icon: 'Ticket', text: 'FREE Event Pass (₹199 value)' },
  { icon: 'Award', text: 'Official Certificate from SVCE + GDG' },
  { icon: 'KeyRound', text: 'Backstage Access + Control Room Tour' },
  { icon: 'Globe', text: 'Named on Landing Page' },
  { icon: 'Star', text: 'Star Ambassador Award for top recruiter' },
]

export const EVENT_HIGHLIGHTS = [
  { number: '24', suffix: 'hrs', label: 'Non-stop Hackathon', color: 'cyan' as const },
  { number: '6', suffix: '+', label: 'Hackathon Domains', color: 'orange' as const },
  { number: '9', suffix: '', label: 'Departments Showcasing', color: 'cyan' as const },
  { number: '3', suffix: '+', label: 'Workshops', color: 'orange' as const },
  { number: '₹', suffix: '199', label: 'One Ticket. Everything.', color: 'cyan' as const },
  { number: '2', suffix: ' days', label: 'Of Pure Energy', color: 'orange' as const },
]
