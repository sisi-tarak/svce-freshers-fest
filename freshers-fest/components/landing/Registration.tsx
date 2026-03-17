'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { CheckCircle, Download, Loader2 } from 'lucide-react'
import { DEPARTMENTS, COURSES, EXTERNAL_PRICE } from '@/lib/constants'
import { useMilestone } from '@/hooks/useMilestone'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Tabs from '@/components/ui/Tabs'
import SectionHeading from '@/components/ui/SectionHeading'

type RegistrationType = 'internal' | 'external'

interface FormErrors {
  [key: string]: string
}

export default function Registration() {
  const [type, setType] = useState<RegistrationType>('external')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [ticketId, setTicketId] = useState('')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { milestone } = useMilestone(0)

  const [form, setForm] = useState({
    full_name: '',
    roll_number: '',
    department: '',
    college_name: '',
    course: '',
    year: '',
    phone: '',
    email: '',
    ambassador_code: '',
  })

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[field]
        return next
      })
    }
  }

  const validate = (): boolean => {
    const errs: FormErrors = {}
    if (!form.full_name || form.full_name.length < 2) errs.full_name = 'Name must be at least 2 characters'
    if (!form.phone || !/^[6-9]\d{9}$/.test(form.phone)) errs.phone = 'Enter a valid 10-digit mobile number'
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Enter a valid email address'
    if (!form.year || parseInt(form.year) < 1 || parseInt(form.year) > 4) errs.year = 'Year must be between 1 and 4'

    if (type === 'internal') {
      if (!form.roll_number || form.roll_number.length < 5) errs.roll_number = 'Enter a valid roll number'
      if (!form.department) errs.department = 'Select your department'
    } else {
      if (!form.college_name || form.college_name.length < 2) errs.college_name = 'Enter your college name'
      if (!form.course) errs.course = 'Select your course'
    }

    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)
    try {
      const endpoint = type === 'internal' ? '/api/register/internal' : '/api/register/external'
      const body = type === 'internal'
        ? {
            full_name: form.full_name,
            roll_number: form.roll_number,
            department: form.department,
            year: parseInt(form.year),
            phone: form.phone,
            email: form.email,
          }
        : {
            full_name: form.full_name,
            college_name: form.college_name,
            course: form.course,
            year: parseInt(form.year),
            phone: form.phone,
            email: form.email,
            ambassador_code: form.ambassador_code || undefined,
          }

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      const data = await res.json()

      if (!res.ok) {
        setErrors({ submit: data.error || 'Registration failed. Please try again.' })
        return
      }

      if (data.paymentRequired && data.razorpay_order_id) {
        // Open Razorpay checkout
        await openRazorpay(data.razorpay_order_id, data.amount, data.registrationId)
      } else {
        setTicketId(data.ticket_id || 'FFEST-XXXX')
        setSuccess(true)
      }
    } catch {
      setErrors({ submit: 'Something went wrong. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  const openRazorpay = async (orderId: string, amount: number, registrationId: string) => {
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    document.body.appendChild(script)

    script.onload = () => {
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: amount * 100,
        currency: 'INR',
        name: 'Freshers Fest 2026',
        description: `${type === 'internal' ? 'SVCE Student' : 'External Student'} Registration`,
        order_id: orderId,
        handler: async (response: { razorpay_payment_id: string; razorpay_order_id: string; razorpay_signature: string }) => {
          try {
            const verifyRes = await fetch('/api/register/external/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                registrationId,
              }),
            })
            const verifyData = await verifyRes.json()
            if (verifyRes.ok) {
              setTicketId(verifyData.ticket_id || 'FFEST-XXXX')
              setSuccess(true)
            } else {
              setErrors({ submit: 'Payment verification failed. Contact support.' })
            }
          } catch {
            setErrors({ submit: 'Payment verification failed.' })
          }
        },
        prefill: {
          name: form.full_name,
          email: form.email,
          contact: form.phone,
        },
        theme: { color: '#FF4D00' },
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const rzp = new (window as any).Razorpay(options)
      rzp.open()
    }
  }

  const currentPrice = type === 'internal' ? milestone.svce_price : EXTERNAL_PRICE

  if (success) {
    return (
      <section id="register" className="section-padding bg-bg-primary" ref={ref}>
        <div className="max-w-lg mx-auto text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <CheckCircle className="w-20 h-20 text-green-400 mx-auto mb-6" />
          </motion.div>
          <h2 className="font-heading font-bold text-3xl text-text-primary mb-3">
            You&apos;re In! 🎉
          </h2>
          <p className="text-text-secondary mb-2">
            Ticket ID: <span className="font-mono text-accent-orange font-bold">{ticketId}</span>
          </p>
          <p className="text-text-muted text-sm mb-6">
            Check your email for the e-ticket with QR code. Show it at the registration desk.
          </p>
          <Button variant="outline" size="lg">
            <Download className="w-5 h-5" />
            Download E-Ticket PDF
          </Button>
        </div>
      </section>
    )
  }

  return (
    <section id="register" className="section-padding bg-bg-primary" ref={ref}>
      <div className="max-w-xl mx-auto">
        <SectionHeading
          title="Secure Your Spot"
          subtitle="Register now. Get your QR-coded e-ticket instantly."
          gradient
        />

        {/* Type Switcher */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="flex justify-center mb-8"
        >
          <Tabs
            tabs={[
              { id: 'external', label: `External — ₹${EXTERNAL_PRICE}` },
              { id: 'internal', label: `SVCE — ${milestone.svce_price === 0 ? 'FREE' : `₹${milestone.svce_price}`}` },
            ]}
            activeTab={type}
            onTabChange={(id) => {
              setType(id as RegistrationType)
              setErrors({})
            }}
          />
        </motion.div>

        {/* Price Display */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="text-center mb-8"
        >
          <span className="text-text-muted text-sm">Registration Fee: </span>
          <span className="text-3xl font-heading font-bold text-accent-orange">
            {currentPrice === 0 ? 'FREE' : `₹${currentPrice}`}
          </span>
          {type === 'internal' && milestone.svce_price > 0 && (
            <p className="text-text-muted text-xs mt-1">
              Price drops as more external students register!
            </p>
          )}
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <Input
            label="Full Name"
            id="full_name"
            placeholder="Enter your full name"
            value={form.full_name}
            onChange={(e) => updateField('full_name', e.target.value)}
            error={errors.full_name}
            required
          />

          {type === 'internal' ? (
            <>
              <Input
                label="SVCE Roll Number"
                id="roll_number"
                placeholder="e.g., 21B01A0501"
                value={form.roll_number}
                onChange={(e) => updateField('roll_number', e.target.value.toUpperCase())}
                error={errors.roll_number}
                required
              />
              <Select
                label="Department"
                id="department"
                placeholder="Select your department"
                options={DEPARTMENTS.map((d) => ({ value: d, label: d }))}
                value={form.department}
                onChange={(e) => updateField('department', e.target.value)}
                error={errors.department}
                required
              />
            </>
          ) : (
            <>
              <Input
                label="College Name"
                id="college_name"
                placeholder="Enter your college name"
                value={form.college_name}
                onChange={(e) => updateField('college_name', e.target.value)}
                error={errors.college_name}
                required
              />
              <Select
                label="Course"
                id="course"
                placeholder="Select your course"
                options={COURSES.map((c) => ({ value: c, label: c }))}
                value={form.course}
                onChange={(e) => updateField('course', e.target.value)}
                error={errors.course}
                required
              />
            </>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Year"
              id="year"
              placeholder="Year"
              options={[
                { value: '1', label: '1st Year' },
                { value: '2', label: '2nd Year' },
                { value: '3', label: '3rd Year' },
                { value: '4', label: '4th Year' },
              ]}
              value={form.year}
              onChange={(e) => updateField('year', e.target.value)}
              error={errors.year}
              required
            />
            <Input
              label="Phone Number"
              id="phone"
              type="tel"
              placeholder="10-digit mobile number"
              value={form.phone}
              onChange={(e) => updateField('phone', e.target.value.replace(/\D/g, '').slice(0, 10))}
              error={errors.phone}
              required
            />
          </div>

          <Input
            label="Email Address"
            id="email"
            type="email"
            placeholder="your@email.com"
            value={form.email}
            onChange={(e) => updateField('email', e.target.value)}
            error={errors.email}
            required
          />

          {type === 'external' && (
            <Input
              label="Ambassador Referral Code (Optional)"
              id="ambassador_code"
              placeholder="e.g., AMB-COLLEGE-XYZ"
              value={form.ambassador_code}
              onChange={(e) => updateField('ambassador_code', e.target.value.toUpperCase())}
            />
          )}

          {errors.submit && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              {errors.submit}
            </div>
          )}

          <Button type="submit" size="lg" glow className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Processing...
              </>
            ) : (
              `Register — ${currentPrice === 0 ? 'FREE' : `₹${currentPrice}`}`
            )}
          </Button>

          <p className="text-text-muted text-xs text-center">
            By registering, you agree to receive event-related communications via email and SMS.
          </p>
        </motion.form>
      </div>
    </section>
  )
}
