import type { EventCard, HackathonDomain, JudgingCriteria, ScheduleItem, SponsorTier } from '@/types'

export const EVENT_DATE = new Date('2026-04-10T09:00:00+05:30')
export const EVENT_END_DATE = new Date('2026-04-11T20:00:00+05:30')
export const HACKATHON_START = new Date('2026-04-10T12:00:00+05:30')
export const HACKATHON_END = new Date('2026-04-11T12:00:00+05:30')

// Unified ticket price for ALL students
export const TICKET_PRICE = 200

// Hackathon add-on fee
export const HACKATHON_FEE = 100

// Ticket9 placeholder URL
export const TICKET9_URL = '#ticket9-register'

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
  { icon: 'Code2', title: '24-Hour Hackathon', description: '4 domains. 24 hours. Build something real. +₹100 add-on.', day: 'Day 1–2' },
  { icon: 'GraduationCap', title: 'Workshops', description: '3 parallel tracks: AI & ML, Web Dev, Cybersecurity — hands-on, 90-minute deep dives.', day: 'Day 2' },
  { icon: 'Cpu', title: 'Project Exhibition', description: 'Software & hardware projects from all departments. Top 5 per dept, selected by HODs.', day: 'Day 2' },
  { icon: 'Rocket', title: 'Startup Showcase', description: '3–5 SVCE student & alumni startups. Live product demos. Audience vote determines winner.', day: 'Day 2' },
  { icon: 'Users', title: 'SVCEians Success Stories', description: '3 alumni speakers + live student Q&A. Raw, unfiltered.', day: 'Day 2' },
  { icon: 'Gamepad2', title: 'Fun Stalls', description: '6 to 8 themed fun stalls + food stalls via bidding system.', day: 'Both Days' },
  { icon: 'Music', title: 'Musical Evening', description: 'SVCE College Band + Solo Performances + Group Acts. Registered participants only.', day: 'Day 2' },
]

export const HACKATHON_DOMAINS: HackathonDomain[] = [
  { number: 1, title: 'Smart Daily Life', areas: ['Home automation', 'Personal productivity', 'Health tracking'] },
  { number: 2, title: 'Local Community Solutions', areas: ['Tirupati/AP local problems', 'Civic engagement', 'Community services'] },
  { number: 3, title: 'Campus & Student Life Tech', areas: ['Student tools', 'Campus navigation', 'Academic helpers'] },
  { number: 4, title: 'Green & Clean Environment', areas: ['Waste management', 'Energy optimization', 'Sustainability tracking'] },
]

export const JUDGING_CRITERIA: JudgingCriteria[] = [
  { name: 'Innovation & Originality', percentage: 25 },
  { name: 'Technical Complexity', percentage: 20 },
  { name: 'Problem-Solution Fit', percentage: 20 },
  { name: 'Demo Quality', percentage: 20 },
  { name: 'Impact & Scalability', percentage: 15 },
]

export const HACKATHON_TIMELINE = [
  { time: '12:00 PM', label: 'Official Launch — Clock Starts' },
  { time: '2:30 PM', label: 'Mentoring Round 1' },
  { time: '4:00 PM', label: 'Snack Round 1 (Hackathon Participants)' },
  { time: '6:00 PM', label: 'Hackathon Dinner' },
  { time: '7:00 PM', label: 'Mentoring Round 2 + Pivot Window' },
  { time: '10:30 PM', label: 'Hackathon Night — Special Activation' },
  { time: '2:00 AM', label: 'Leadership Walk (All Hackathon Labs)' },
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
  { time: '4:00 PM', title: 'Snack Round 1 (Hackathon Participants)', venue: 'Labs', category: 'break' },
  { time: '6:00 PM', title: 'Hackathon Dinner', venue: 'Canteen', category: 'break' },
  { time: '7:00 PM', title: 'Mentoring Round 2 + Pivot Window', venue: 'Labs', category: 'hackathon' },
  { time: '10:30 PM', title: 'Hackathon Night — Special Activation', venue: 'Labs', category: 'hackathon' },
  { time: '2:00 AM', title: 'Leadership Walk (All Hackathon Labs)', venue: 'Campus', category: 'hackathon' },
]

export const DAY2_SCHEDULE: ScheduleItem[] = [
  { time: '8:00 AM', title: 'Breakfast Delivered to Labs', venue: 'Labs', category: 'break' },
  { time: '9:00 AM', title: 'Final Mentoring + Code Freeze Warning', venue: 'Labs', category: 'hackathon' },
  { time: '9:30 AM', title: 'Fun Stalls Open + Project Exhibition + Startup Showcase', venue: 'Campus Grounds', category: 'general' },
  { time: '11:00 AM', title: 'Hackathon Submissions Lock', venue: 'Online Portal', category: 'hackathon' },
  { time: '12:00 PM', title: 'HACKATHON ENDS + Freshers Inauguration Ceremony', venue: 'Auditorium', category: 'general' },
  { time: '1:30 PM', title: 'Lunch Break', venue: 'Canteen', category: 'break' },
  { time: '2:00 PM', title: 'Hackathon Demo & Judging + Project Exhibition + Workshops (3 Parallel Tracks)', venue: 'Labs + Seminar Halls', category: 'tech' },
  { time: '3:00 PM', title: 'SVCEians Success Stories — 3 Alumni + Live Q&A', venue: 'Auditorium', category: 'general' },
  { time: '4:00 PM', title: 'Snack Break for ALL Attendees', venue: 'Campus-wide', category: 'break' },
  { time: '4:30 PM', title: 'Hackathon Results + Prize Announcements', venue: 'Auditorium', category: 'general' },
  { time: '5:30 PM', title: 'Prize Distribution + Social Media Contest Winners', venue: 'Auditorium', category: 'general' },
  { time: '6:00 PM', title: 'MUSICAL EVENING: College Band + Solo Performances + Group Acts', venue: 'Open Stage', category: 'cultural' },
  { time: '8:00 PM', title: 'Event Closes', venue: 'Campus', category: 'general' },
]

export const SPONSOR_TIERS: SponsorTier[] = [
  {
    name: 'Bronze', priceRange: '₹50,000', color: '#CD7F32',
    benefits: ['Logo on ALL participant ID cards (2 days, 1,500+ attendees)', 'Logo on Hackathon live screens (24 hours)', 'Name in brochure & landing page', 'Certificate of Association', '1 dedicated social media post'],
  },
  {
    name: 'Silver', priceRange: '₹1,00,000', color: '#C0C0C0',
    benefits: ['All Bronze benefits', '5-minute speaking slot on stage', 'Logo on main stage banner & standees', 'Company mentioned in all MC announcements', 'Featured reel + story on GDG Instagram'],
  },
  {
    name: 'Gold', priceRange: '₹2,00,000', color: '#FFD700',
    benefits: ['All Silver benefits', 'Dedicated branded stall on campus', 'Direct interaction with hackathon participants', 'Access to participant project portfolios (with consent)', 'Internship/offer opportunity to top hackathon teams', 'Exclusive branding at Award Ceremony', '10-minute speaking slot on stage'],
  },
]

export const FOOD_STALL_TIERS = [
  { name: 'Standard Food Stall', price: '₹35,000', description: '2-day stall rights on campus' },
  { name: 'Premium Food Stall', price: '₹45,000', description: '2-day premium location (biryani etc.)' },
  { name: 'Midnight Delivery Partner', price: '10% revenue share', description: 'Midnight hackathon orders' },
]

export const SPEAKER_PLACEHOLDERS = [
  { name: 'Prashanth Kumar', current_role: 'SVCE Alumni', company: 'Details TBC', description: 'Accomplished SVCE alumnus returning to share insights and career journey with current students.', speaker_type: 'Alumni Speaker' },
  { name: 'Sai Kumar', current_role: 'SVCE Alumni', company: 'Details TBC', description: 'SVCE alumnus sharing real-world experience and advice for aspiring engineers.', speaker_type: 'Alumni Speaker' },
  { name: 'To Be Announced', current_role: 'Coming Soon', company: 'TBA', description: 'Third speaker to be announced soon. Stay tuned!', speaker_type: 'TBA' },
]

export const AMBASSADOR_BENEFITS = [
  { icon: 'Ticket', text: 'Every 10 registrations = 1 FREE PASS (₹200 value)' },
  { icon: 'Award', text: 'Official Certificate from SVCE + GDG' },
  { icon: 'KeyRound', text: 'Backstage Access + Control Room Tour' },
  { icon: 'Globe', text: 'Featured on Landing Page' },
  { icon: 'Star', text: 'Star Ambassador Award for top recruiter' },
]

export const EVENT_HIGHLIGHTS = [
  { number: '24', suffix: 'hrs', label: 'Non-stop Hackathon', color: 'cyan' as const },
  { number: '4', suffix: '', label: 'Hackathon Domains', color: 'orange' as const },
  { number: '150', suffix: '+', label: 'Organizers', color: 'cyan' as const },
  { number: '3', suffix: '', label: 'Workshop Tracks', color: 'orange' as const },
  { number: '₹', suffix: '200', label: 'One Ticket. Everything.', color: 'cyan' as const },
  { number: '2', suffix: ' days', label: 'Of Pure Energy', color: 'orange' as const },
]

export const TEAM_MEMBERS = {
  lead: { name: 'Sisindri Singamsetti', role: 'Overall Event Lead' },
  core: [
    { name: 'Kesavananda', role: 'Registration & Security Head' },
    { name: 'Tejaswi', role: 'Events Head' },
    { name: 'Preethi Hasini & Pranav', role: 'Social Media & Marketing Head' },
    { name: 'Sisindri Singamsetti', role: 'Technical Head' },
    { name: 'Sisindri Singamsetti', role: 'Finance Head' },
    { name: 'Pavani & Chasanth', role: 'Sponsorship Head' },
    { name: 'Revanth', role: 'Hospitality & Medical Head' },
    { name: 'Vignesh & Mohanesh', role: 'Logistics Head' },
    { name: 'Sriyamini', role: 'Outreach & Ambassador Head' },
    { name: 'Chasanth', role: 'Awards & Ceremonies Head' },
  ],
  events: [
    { name: 'Sisindri Singamsetti', role: 'Hackathon Head' },
    { name: 'Sowmya & Yogi Sreenivas', role: 'Workshops Head' },
    { name: 'Chasanth & Vignesh', role: 'Project Exhibition Head' },
    { name: 'Rohitha', role: 'Startup Showcase Head' },
    { name: 'Sriyamini', role: 'Alumni & Success Stories Head' },
    { name: 'To Be Announced', role: 'Musical Evening Head' },
    { name: 'To Be Announced', role: 'Fun & Food Stalls Head' },
  ],
}
