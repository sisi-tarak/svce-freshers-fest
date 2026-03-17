export interface InternalRegistration {
  id: string
  full_name: string
  roll_number: string
  department: string
  year: number
  phone: string
  email: string
  ticket_id: string
  price_paid: number
  payment_id: string | null
  payment_status: 'free' | 'pending' | 'paid' | 'failed'
  checked_in: boolean
  checked_in_at: string | null
  created_at: string
}

export interface ExternalRegistration {
  id: string
  full_name: string
  college_name: string
  course: string
  year: number
  phone: string
  email: string
  ticket_id: string
  price_paid: number
  razorpay_payment_id: string | null
  razorpay_order_id: string | null
  payment_status: 'pending' | 'paid' | 'failed'
  ambassador_code: string | null
  checked_in: boolean
  checked_in_at: string | null
  created_at: string
}

export interface HackathonTeam {
  id: string
  team_name: string
  domain: string
  member_names: TeamMember[]
  lab_assignment: string | null
  block_assignment: string | null
  submission_url: string | null
  scores: HackathonScores | null
  final_rank: number | null
  created_at: string
}

export interface TeamMember {
  name: string
  role: string
  college: string
  email: string
}

export interface HackathonScores {
  innovation: number
  technical: number
  problem_fit: number
  demo: number
  impact: number
  total: number
}

export interface Ambassador {
  id: string
  full_name: string
  college_name: string
  phone: string
  email: string
  referral_code: string
  registrations_count: number
  certificate_eligible: boolean
  star_ambassador: boolean
  created_at: string
}

export interface Sponsor {
  id: string
  company_name: string
  tier: 'bronze' | 'silver' | 'gold' | 'food'
  logo_url: string | null
  contact_person: string | null
  contact_email: string | null
  amount: number | null
  payment_status: 'pending' | 'paid'
  notes: string | null
  is_confirmed: boolean
  created_at: string
}

export interface Speaker {
  id: string
  name: string
  photo_url: string | null
  current_role: string | null
  company: string | null
  description: string | null
  speaker_type: string | null
  sort_order: number
  is_visible: boolean
}

export interface FAQEntry {
  id: string
  question: string
  answer: string
  sort_order: number
  is_visible: boolean
}

export interface SiteSettings {
  key: string
  value: Record<string, unknown>
  updated_at: string
}

export interface MilestoneData {
  external_count: number
  svce_price: number
  tier: 'tier1' | 'tier2' | 'tier3' | 'free'
  next_threshold: number | null
}

export interface ScheduleItem {
  time: string
  title: string
  venue?: string
  lead?: string
  category: 'hackathon' | 'tech' | 'general' | 'break' | 'cultural'
}

export interface EventCard {
  icon: string
  title: string
  description: string
  day: string
}

export interface HackathonDomain {
  number: number
  title: string
  areas: string[]
}

export interface JudgingCriteria {
  name: string
  percentage: number
}

export interface SponsorTier {
  name: string
  priceRange: string
  benefits: string[]
  color: string
}
